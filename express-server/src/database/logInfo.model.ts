import * as mongoose from 'mongoose';

const infoSchema = new mongoose.Schema({
    str1: { type: String },
    str2: { type: String },
}, {
    timestamps: { createdAt: 'created_at' }
});

let LogInfo = mongoose.model('LogInfo', infoSchema);

export { LogInfo };
