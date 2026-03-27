import rateLimit from 'express-rate-limit';

// Rate limiting middleware for feedback submission
export const feedbackRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 feedback submissions per windowMs
    message: {
        success: false,
        message: 'Too many feedback submissions from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Validation middleware for feedback data
export const validateFeedback = (req, res, next) => {
    // Ensure req.body exists and is an object
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({
            success: false,
            message: 'Request body is required',
            errors: ['No request body provided']
        });
    }

    const { name, email, subject, message, rating } = req.body;

    const errors = [];

    // Check required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.push('Name is required');
    } else if (name.trim().length > 100) {
        errors.push('Name cannot exceed 100 characters');
    }

    if (!email || typeof email !== 'string' || email.trim().length === 0) {
        errors.push('Email is required');
    } else {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            errors.push('Please enter a valid email address');
        }
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
        errors.push('Subject is required');
    } else if (subject.trim().length > 200) {
        errors.push('Subject cannot exceed 200 characters');
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
        errors.push('Message is required');
    } else if (message.trim().length > 1000) {
        errors.push('Message cannot exceed 1000 characters');
    }

    if (!rating || isNaN(rating)) {
        errors.push('Rating is required and must be a number');
    } else if (rating < 1 || rating > 5) {
        errors.push('Rating must be between 1 and 5');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

// Sanitize feedback data
export const sanitizeFeedback = (req, res, next) => {
    // Ensure req.body exists and is an object
    if (!req.body || typeof req.body !== 'object') {
        req.body = {};
        return next();
    }

    const { name, email, subject, message, tags } = req.body;

    // Sanitize text fields - only if they exist and are strings
    if (name && typeof name === 'string') req.body.name = name.trim();
    if (email && typeof email === 'string') req.body.email = email.trim().toLowerCase();
    if (subject && typeof subject === 'string') req.body.subject = subject.trim();
    if (message && typeof message === 'string') req.body.message = message.trim();

    // Sanitize tags array
    if (tags && Array.isArray(tags)) {
        req.body.tags = tags
            .map(tag => tag && typeof tag === 'string' ? tag.trim() : '')
            .filter(tag => tag.length > 0)
            .slice(0, 10); // Limit to 10 tags
    }

    next();
};

// Log feedback requests
export const logFeedbackRequest = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    console.log(`[${timestamp}] Feedback request from ${ip}:`, {
        method: req.method,
        path: req.path,
        userAgent: userAgent?.substring(0, 100) // Truncate for logging
    });

    next();
};

// Check if feedback is spam (basic implementation)
export const checkSpam = (req, res, next) => {
    // Ensure req.body exists
    if (!req.body) {
        return next();
    }

    const { message, subject } = req.body;

    // If no message or subject, skip spam check
    if (!message || !subject) {
        return next();
    }

    const combinedText = `${subject} ${message}`.toLowerCase();

    // Basic spam detection patterns
    const spamPatterns = [
        /\b(viagra|casino|loan|credit|debt|weight loss)\b/i,
        /\b(click here|buy now|limited time|act now)\b/i,
        /(http|www\.)\S+/g, // URLs
        /\b[A-Z]{5,}\b/, // ALL CAPS words
        /!{3,}/, // Multiple exclamation marks
    ];

    const spamScore = spamPatterns.reduce((score, pattern) => {
        const matches = combinedText.match(pattern);
        return score + (matches ? matches.length : 0);
    }, 0);

    if (spamScore > 3) {
        return res.status(400).json({
            success: false,
            message: 'Feedback appears to be spam and cannot be submitted'
        });
    }

    next();
};

// Admin authentication middleware (placeholder)
export const requireAdmin = (req, res, next) => {
    // This is a placeholder - implement proper authentication
    const adminToken = req.headers['x-admin-token'];

    if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
        return res.status(401).json({
            success: false,
            message: 'Admin access required'
        });
    }

    next();
};
