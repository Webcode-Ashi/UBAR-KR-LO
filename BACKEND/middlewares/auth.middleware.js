const userModel = require('../models/usemodels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
module.exports.authenticateUser = async (req, res, next) => {
const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
}
const isBlacklisted =await blacklistTokenModel.findOne({ token });
if(isBlacklisted){
    return res.status(401).json({message:'unauthorized Acess'});
}
try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user =await userModel.findById(decoded._id).select('-password');
    req.user = user;
    return next();
}
catch(err){
    res.status(401).json({ error: 'Invalid token.' });
}
}