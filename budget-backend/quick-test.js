import fetch from 'node-fetch';

async function quickTest() {
    try {
        // Test 1: Server connection
        console.log('Testing server connection...');
        const response = await fetch('http://localhost:6000/');
        const text = await response.text();
        console.log('✅ Server response:', text);

        // Test 2: Create feedback
        console.log('\nTesting create feedback...');
        const feedbackData = {
            name: "John Doe",
            email: "john@example.com",
            subject: "Test Feedback",
            message: "This is a test feedback message.",
            rating: 4,
            category: "general"
        };

        const createResponse = await fetch('http://localhost:6000/api/feedbacks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedbackData)
        });

        const createResult = await createResponse.json();
        console.log('✅ Create feedback result:', createResult);

        // Test 3: Get feedbacks
        console.log('\nTesting get feedbacks...');
        const getResponse = await fetch('http://localhost:6000/api/feedbacks');
        const getResult = await getResponse.json();
        console.log('✅ Get feedbacks result:', getResult);

        // Test 4: Get stats
        console.log('\nTesting get stats...');
        const statsResponse = await fetch('http://localhost:6000/api/feedbacks/stats');
        const statsResult = await statsResponse.json();
        console.log('✅ Stats result:', statsResult);

        console.log('\n🎉 All tests passed! Backend is working correctly.');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

quickTest();
