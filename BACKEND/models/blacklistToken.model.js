const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
     },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 7 * 24 * 60 * 60 // Expire after 7 days
     }
    }
);
module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);