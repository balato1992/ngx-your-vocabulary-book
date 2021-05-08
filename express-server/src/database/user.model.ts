import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleId: { type: String, },
    displayName: { type: String },
    email: {
        type: String,
        match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–9-]*[a-z0–9])?/,
    },

    wordItems: [{ type: Schema.Types.ObjectId, ref: 'WordItem' }]
}, {
    timestamps: { createdAt: 'created_at' }
});

let User = mongoose.model('User', UserSchema);

export { User };
