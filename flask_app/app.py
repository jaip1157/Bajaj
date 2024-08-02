from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api', methods=['GET', 'POST'])
def api():
    if request.method == 'POST':
        data = request.get_json()
        status = data.get("status")
        user_id = data.get("user_id")
        college_email_id = data.get("college_email_id")
        college_roll_number = data.get("college_roll_number")
        data_string = data.get("data", "")

        numbers = [int(char) for char in data_string if char.isdigit()]
        alphabets = [char for char in data_string if char.isalpha()]

        response = {
            "status": status,
            "user_id": user_id,
            "college_email_id": college_email_id,
            "college_roll_number": college_roll_number,
            "numbers": numbers,
            "alphabets": alphabets
        }
        return jsonify(response)
    else:
        return jsonify({"operation_code": 200})

if __name__ == '__main__':
    app.run()
