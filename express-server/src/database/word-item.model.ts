import * as mongoose from 'mongoose';
import { Types } from 'mongoose';

const wordItemSchema = new mongoose.Schema({
    _id: Types.ObjectId,
    sentence1: String,
    sentence2: String,
    highlights: [{
        start: Number,
        end: Number
    }],

    server: {
        user: { type: Types.ObjectId, ref: 'User' },
        updateDate: Date
    }
}, {
    timestamps: { createdAt: 'created_at' }
});

let WordItem = mongoose.model('WordItem', wordItemSchema);

export { WordItem };
