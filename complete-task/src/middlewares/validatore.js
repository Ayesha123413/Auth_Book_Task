
const { check, validationResult } = require('express-validator');

// Validation middleware for book creation and update
const bookValidationRules = [
    check('title').notEmpty().withMessage('Title is required'),
    check('author').notEmpty().withMessage('Author is required'),
    check('genre').notEmpty().withMessage('Genre is required'),
    check('publicationYear').isNumeric().withMessage('Publication year must be a number'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(422).json({ errors: errors.array() });
};

module.exports = {
    bookValidationRules,
    validate,
};