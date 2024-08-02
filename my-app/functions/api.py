import json
import sys

sys.path.append("./flask_app")
from app import app as flask_app

from flask import request

def handler(event, context):
    with flask_app.test_request_context(
        path='/api', method=event['httpMethod'], json=json.loads(event['body'] if event['body'] else '{}')
    ):
        response = flask_app.full_dispatch_request()
        return {
            "statusCode": response.status_code,
            "headers": dict(response.headers),
            "body": response.get_data(as_text=True)
        }
