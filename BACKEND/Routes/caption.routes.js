const express = require('express');
const router = express.Router();
const captionController = require('../Controllers/caption.controller');
const { body } = require('express-validator');
const authMiddleware = require('../Middlewares/auth.middleware');

router.post('/register',[
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').optional().isLength({min: 3}).withMessage('Last name must be at least 3 characters long'),            
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3, max: 50 }).withMessage('Vehicle color must be between 3 and 50 characters'),
    body('vehicle.plate').isLength({ min: 2, max: 20 }).withMessage('Vehicle plate must be between 2 and 20 characters'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be a positive integer'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be either car, motorcycle, or auto'),
],
captionController.registerCaption);
module.exports = router;