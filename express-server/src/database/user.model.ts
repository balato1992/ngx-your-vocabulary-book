import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    googleId: { type: String, },
    name: { type: String },
    email: {
        type: String,
        match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–9-]*[a-z0–9])?/,
    }
}, {
    timestamps: { createdAt: 'created_at' }
});

let User = mongoose.model('User', UserSchema);

export { User };
