import express from 'express';
import {
    getFeedbacks,
    getFeedbackById,
    createFeedback,
    updateFeedback,
    deleteFeedback,
    markAsResolved,
    getFeedbackStats,
    bulkUpdateStatus
} from '../controllers/feedbackController.js';
import {
    feedbackRateLimit,
    validateFeedback,
    sanitizeFeedback,
    logFeedbackRequest,
    checkSpam,
    requireAdmin
} from '../middleware/feedbackMiddleware.js';

const router = express.Router();

// Apply logging middleware to all routes
router.use(logFeedbackRequest);

// GET routes - Order matters! Specific routes first
router.get('/stats', getFeedbackStats);
router.get('/', getFeedbacks);
router.get('/:id', getFeedbackById);

// POST routes - Public feedback submission with rate limiting and validation
router.post('/',
    // feedbackRateLimit, // Temporarily disabled for testing
    sanitizeFeedback,
    validateFeedback,
    checkSpam,
    createFeedback
);

// Admin routes - require authentication
router.post('/:id/resolve', requireAdmin, markAsResolved);
router.post('/bulk-update', requireAdmin, bulkUpdateStatus);

// PUT routes - require authentication
router.put('/:id', requireAdmin, updateFeedback);

// DELETE routes - require authentication
router.delete('/:id', requireAdmin, deleteFeedback);

export default router;
