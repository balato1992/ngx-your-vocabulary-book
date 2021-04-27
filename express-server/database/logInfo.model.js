const mongoose = require('mongoose');

const infoSchema = mongoose.Schema({
    str1: { type: String },
    str2: { type: String },
}, {
    timestamps: { createdAt: 'created_at' }
});

const LogInfo = mongoose.model('Info', infoSchema);

module.exports = LogInfo;