const mongoose = require('mongoose');

const mongoUri = '';

function connect() {
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("Database Connected"))
        .catch((err) => console.log(err));
    mongoose.Promise = global.Promise;
}

module.exports = {
    connect,
    mongoose
};
