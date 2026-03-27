// Debug test for feedback API
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api/feedbacks';

// Test 1: Basic feedback submission
async function testBasicFeedback() {
    console.log('Testing basic feedback submission...');

    const testData = {
        name: "John Doe",
        email: "john.doe@example.com",
        subject: "Test Feedback",
        message: "This is a test feedback message.",
        rating: 4
    };

    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        console.log('Status:', response.status);
        console.log('Status Text:', response.statusText);

        const data = await response.json();
        console.log('Response:', JSON.stringify(data, null, 2));

        return response.status === 201 || response.status === 200;
    } catch (error) {
        console.error('Error:', error.message);
        return false;
    }
}

// Test 2: GET request to see if server is running
async function testServerConnection() {
    console.log('\nTesting server connection...');

    try {
        const response = await fetch(`${BASE_URL}`);
        console.log('GET Status:', response.status);

        const data = await response.json();
        console.log('GET Response:', JSON.stringify(data, null, 2));

        return true;
    } catch (error) {
        console.error('Server connection error:', error.message);
        return false;
    }
}

// Test 3: Test with minimal data
async function testMinimalData() {
    console.log('\nTesting with minimal data...');

    const minimalData = {
        name: "Test",
        email: "test@test.com",
        subject: "Test",
        message: "Test",
        rating: 3
    };

    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(minimalData)
        });

        console.log('Minimal Status:', response.status);

        const data = await response.json();
        console.log('Minimal Response:', JSON.stringify(data, null, 2));

        return response.status === 201 || response.status === 200;
    } catch (error) {
        console.error('Minimal test error:', error.message);
        return false;
    }
}

// Run all tests
async function runDebugTests() {
    console.log('=== Feedback API Debug Tests ===\n');

    const serverOk = await testServerConnection();
    if (!serverOk) {
        console.log('❌ Server is not responding');
        return;
    }

    console.log('✅ Server is responding');

    const basicOk = await testBasicFeedback();
    if (!basicOk) {
        console.log('❌ Basic feedback test failed');
    } else {
        console.log('✅ Basic feedback test passed');
    }

    const minimalOk = await testMinimalData();
    if (!minimalOk) {
        console.log('❌ Minimal data test failed');
    } else {
        console.log('✅ Minimal data test passed');
    }
}

runDebugTests().catch(console.error);
