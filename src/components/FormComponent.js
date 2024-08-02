import React, { useState } from 'react';

const FormComponent = () => {
    const [userId, setUserId] = useState('');
    const [collegeEmail, setCollegeEmail] = useState('');
    const [collegeRoll, setCollegeRoll] = useState('');
    const [numbers, setNumbers] = useState('');
    const [alphabets, setAlphabets] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                college_email: collegeEmail,
                college_roll: collegeRoll,
                numbers: numbers.split(',').map(Number),
                alphabets: alphabets.split(',')
            }),
        });
        const data = await response.json();
        setResponse(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" />
                <input type="text" value={collegeEmail} onChange={(e) => setCollegeEmail(e.target.value)} placeholder="College Email" />
                <input type="text" value={collegeRoll} onChange={(e) => setCollegeRoll(e.target.value)} placeholder="College Roll" />
                <input type="text" value={numbers} onChange={(e) => setNumbers(e.target.value)} placeholder="Numbers (comma-separated)" />
                <input type="text" value={alphabets} onChange={(e) => setAlphabets(e.target.value)} placeholder="Alphabets (comma-separated)" />
                <button type="submit">Submit</button>
            </form>
            {response && (
                <div>
                    <p>Status: {response.Status}</p>
                    <p>User ID: {response["User ID"]}</p>
                    <p>College Email ID: {response["College Email ID"]}</p>
                    <p>College Roll Number: {response["College Roll Number"]}</p>
                    <p>Numbers: {response["Array for numbers"].join(', ')}</p>
                    <p>Alphabets: {response["Array for alphabets"].join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default FormComponent;
