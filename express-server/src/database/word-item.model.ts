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
        userId: { type: Types.ObjectId, ref: 'User' },
        isDeleted: Boolean,
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

let WordItem = mongoose.model('WordItem', wordItemSchema);

export { WordItem };
