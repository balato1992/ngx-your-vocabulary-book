import * as mongoose from 'mongoose';
import { Types } from 'mongoose';

const wordItemSchema = new mongoose.Schema({
    _id: Types.ObjectId,
    sentence: String,
    highlights: [{
        start: Number,
        end: Number
    }],

    updateDate: Date,

    user: { type: Types.ObjectId, ref: 'User' }
}, {
    timestamps: { createdAt: 'created_at' }
});

let WordItem = mongoose.model('WordItem', wordItemSchema);

export { WordItem };
