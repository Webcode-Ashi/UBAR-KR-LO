const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../Controllers/user.controller');  
const authMiddleware = require('../middlewares/auth.middleware');
router.post('/register', [
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').optional().isLength({min: 3}).withMessage('Last name must be at least 3 characters long'),            
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
],
userController.registeruser 
);

router.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
],
userController.loginuser
);
router.get('/profile', authMiddleware.authenticateUser, userController.getUserProfile);
router.post('/logout', authMiddleware.authenticateUser, (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});


module.exports = router;