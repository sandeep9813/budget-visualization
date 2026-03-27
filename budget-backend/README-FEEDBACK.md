# Feedback API Documentation

This document describes the feedback system API endpoints, request/response formats, and usage examples.

## Base URL
```
http://localhost:5000/api/feedbacks
```

## Authentication
- Public endpoints: No authentication required
- Admin endpoints: Require `x-admin-token` header

## Endpoints

### 1. Create Feedback (Public)
**POST** `/api/feedbacks`

Submit a new feedback entry.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "subject": "Website Feedback",
  "message": "The website is great but could use some improvements.",
  "rating": 4,
  "category": "general",
  "isAnonymous": false,
  "tags": ["website", "improvement"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Feedback submitted successfully",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "subject": "Website Feedback",
    "message": "The website is great but could use some improvements.",
    "rating": 4,
    "category": "general",
    "status": "pending",
    "priority": "medium",
    "isAnonymous": false,
    "tags": ["website", "improvement"],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Get All Feedbacks
**GET** `/api/feedbacks`

Retrieve all feedbacks with pagination, filtering, and sorting.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `status` (string): Filter by status (pending, in-progress, resolved, closed)
- `category` (string): Filter by category
- `priority` (string): Filter by priority (low, medium, high, urgent)
- `rating` (number): Filter by minimum rating
- `search` (string): Search in name, email, subject, message
- `sortBy` (string): Sort field (default: createdAt)
- `sortOrder` (string): Sort order (asc, desc)

**Example:**
```
GET /api/feedbacks?page=1&limit=5&status=pending&sortBy=createdAt&sortOrder=desc
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "subject": "Website Feedback",
      "message": "The website is great but could use some improvements.",
      "rating": 4,
      "category": "general",
      "status": "pending",
      "priority": "medium",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10
  }
}
```

### 3. Get Feedback by ID
**GET** `/api/feedbacks/:id`

Retrieve a specific feedback by its ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "subject": "Website Feedback",
    "message": "The website is great but could use some improvements.",
    "rating": 4,
    "category": "general",
    "status": "pending",
    "priority": "medium",
    "isAnonymous": false,
    "tags": ["website", "improvement"],
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0...",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 4. Get Feedback Statistics
**GET** `/api/feedbacks/stats`

Get comprehensive feedback statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 150,
    "avgRating": 4.2,
    "pending": 25,
    "resolved": 120,
    "categoryDistribution": [
      { "_id": "general", "count": 50 },
      { "_id": "budget", "count": 30 },
      { "_id": "service", "count": 25 }
    ],
    "ratingDistribution": [
      { "_id": 1, "count": 5 },
      { "_id": 2, "count": 10 },
      { "_id": 3, "count": 20 },
      { "_id": 4, "count": 60 },
      { "_id": 5, "count": 55 }
    ],
    "recentFeedbacks": 15
  }
}
```

### 5. Update Feedback (Admin)
**PUT** `/api/feedbacks/:id`

Update a feedback entry (requires admin authentication).

**Headers:**
```
x-admin-token: your-admin-token
```

**Request Body:**
```json
{
  "status": "in-progress",
  "priority": "high",
  "adminNotes": "Working on this issue"
}
```

### 6. Mark Feedback as Resolved (Admin)
**POST** `/api/feedbacks/:id/resolve`

Mark a feedback as resolved (requires admin authentication).

**Headers:**
```
x-admin-token: your-admin-token
```

**Request Body:**
```json
{
  "adminId": "admin-user-id",
  "notes": "Issue has been resolved"
}
```

### 7. Bulk Update Status (Admin)
**POST** `/api/feedbacks/bulk-update`

Update status of multiple feedbacks (requires admin authentication).

**Headers:**
```
x-admin-token: your-admin-token
```

**Request Body:**
```json
{
  "ids": ["64f8a1b2c3d4e5f6a7b8c9d0", "64f8a1b2c3d4e5f6a7b8c9d1"],
  "status": "resolved"
}
```

### 8. Delete Feedback (Admin)
**DELETE** `/api/feedbacks/:id`

Delete a feedback entry (requires admin authentication).

**Headers:**
```
x-admin-token: your-admin-token
```

## Data Models

### Feedback Schema
```javascript
{
  name: String (required, max 100 chars),
  email: String (required, valid email format),
  subject: String (required, max 200 chars),
  message: String (required, max 1000 chars),
  rating: Number (required, 1-5),
  category: String (enum: general, budget, service, technical, suggestion, complaint),
  status: String (enum: pending, in-progress, resolved, closed),
  priority: String (enum: low, medium, high, urgent),
  isAnonymous: Boolean (default: false),
  tags: [String],
  adminNotes: String (max 500 chars),
  ipAddress: String,
  userAgent: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Rate Limiting
- Feedback submission is limited to 5 requests per IP address per 15 minutes
- Exceeding the limit returns a 429 status code

## Validation Rules
- All required fields must be provided
- Email must be in valid format
- Rating must be between 1 and 5
- Text fields have maximum length limits
- Spam detection is applied to submissions

## Error Responses
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

## Testing
Run the test script to verify API functionality:
```bash
node test-feedback.js
```

## Environment Variables
Add to your `.env` file:
```
ADMIN_TOKEN=your-secure-admin-token
MONGO_URI=your-mongodb-connection-string
```
