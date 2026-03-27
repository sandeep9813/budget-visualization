import fetch from 'node-fetch';

async function testServer() {
    try {
        console.log('Testing server at http://localhost:6000/');
        const response = await fetch('http://localhost:6000/');
        console.log('Status:', response.status);
        console.log('Status Text:', response.statusText);

        const text = await response.text();
        console.log('Response:', text);

    } catch (error) {
        console.error('Error:', error.message);
    }
}

testServer();
