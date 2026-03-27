// Test script for feedback API
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api/feedbacks';

// Test data
const testFeedback = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    subject: 'Test Feedback',
    message: 'This is a test feedback message to verify the API is working correctly.',
    rating: 4,
    category: 'general',
    tags: ['test', 'api']
};

// Test functions
async function testCreateFeedback() {
    console.log('Testing feedback creation...');
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testFeedback)
        });

        const data = await response.json();
        console.log('Create feedback response:', data);
        return data.success ? data.data._id : null;
    } catch (error) {
        console.error('Error creating feedback:', error);
        return null;
    }
}

async function testGetFeedbacks() {
    console.log('\nTesting get all feedbacks...');
    try {
        const response = await fetch(`${BASE_URL}?page=1&limit=10`);
        const data = await response.json();
        console.log('Get feedbacks response:', data);
    } catch (error) {
        console.error('Error getting feedbacks:', error);
    }
}

async function testGetFeedbackById(id) {
    if (!id) return;

    console.log('\nTesting get feedback by ID...');
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        const data = await response.json();
        console.log('Get feedback by ID response:', data);
    } catch (error) {
        console.error('Error getting feedback by ID:', error);
    }
}

async function testGetStats() {
    console.log('\nTesting get feedback stats...');
    try {
        const response = await fetch(`${BASE_URL}/stats`);
        const data = await response.json();
        console.log('Get stats response:', data);
    } catch (error) {
        console.error('Error getting stats:', error);
    }
}

// Run tests
async function runTests() {
    console.log('Starting feedback API tests...\n');

    const feedbackId = await testCreateFeedback();
    await testGetFeedbacks();
    await testGetFeedbackById(feedbackId);
    await testGetStats();

    console.log('\nTests completed!');
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runTests().catch(console.error);
}
