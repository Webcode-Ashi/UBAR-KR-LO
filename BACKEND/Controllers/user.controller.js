const userModel = require('../models/usemodels');
const userService = require('../Services/user.servics');
const { validationResult } = require('express-validator');
const blacklistModel = require('../models/blacklistToken.model');
module.exports.registeruser = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;
    const hashedPassword = await userModel.hashPassword(password);    
    const user = await userService.createUser({
    fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname
    },
    email,
    password: hashedPassword
});
    const token = user.generateAuthToken();
    res.status(201).json({ user, token });
}
module.exports.loginuser = async (req, res,next) => {
    const errors = validationResult(req);   
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password'); 
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = user.generateAuthToken();
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000
     });
    res.status(200).json({ user, token });
};
module.exports.getUserProfile = async (req, res,next) => {
    const userId = req.user._id; 
    const user = await userModel.findById(userId).select('-password');
    res.status(200).json({ user });
};

module.exports.logoutUser = async (req, res,next) => {
    res.clearCookie('token');
    const token=req.cookies.token || req.headers.authorization.split(' ')[1];
   await blacklistModel.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });
};