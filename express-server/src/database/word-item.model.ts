import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const wordItemSchema = new Schema({
    uid: String,
    sentence: String,
    insertDate: Date,
    highlights: [{
        start: Number,
        end: Number
    }],

    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: { createdAt: 'created_at' }
});

let WordItem = mongoose.model('WordItem', wordItemSchema);

export { WordItem };
