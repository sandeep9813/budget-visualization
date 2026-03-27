import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:6000';

async function testBackend() {
    console.log('Testing backend API...\n');

    // Test 1: Check if server is running
    try {
        console.log('1. Testing server connection...');
        const response = await fetch(`${BASE_URL}/`);
        const text = await response.text();
        console.log('✅ Server is running:', text);
    } catch (error) {
        console.log('❌ Server connection failed:', error.message);
        return;
    }

    // Test 2: Test feedback stats endpoint
    try {
        console.log('\n2. Testing feedback stats...');
        const response = await fetch(`${BASE_URL}/api/feedbacks/stats`);
        const data = await response.json();
        console.log('✅ Stats response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.log('❌ Stats test failed:', error.message);
    }

    // Test 3: Test get feedbacks endpoint
    try {
        console.log('\n3. Testing get feedbacks...');
        const response = await fetch(`${BASE_URL}/api/feedbacks`);
        const data = await response.json();
        console.log('✅ Feedbacks response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.log('❌ Get feedbacks test failed:', error.message);
    }

    // Test 4: Test create feedback endpoint
    try {
        console.log('\n4. Testing create feedback...');
        const testFeedback = {
            name: "Test User",
            email: "test@example.com",
            subject: "Test Feedback",
            message: "This is a test feedback message.",
            rating: 4,
            category: "general"
        };

        const response = await fetch(`${BASE_URL}/api/feedbacks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testFeedback)
        });

        const data = await response.json();
        console.log('✅ Create feedback response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.log('❌ Create feedback test failed:', error.message);
    }
}

testBackend().catch(console.error);
