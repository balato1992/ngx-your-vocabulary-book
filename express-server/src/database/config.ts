import * as mongoose from 'mongoose';
import { CONFIG } from '../config';

const mongoUri = CONFIG.mongoUri;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));

(mongoose as any).Promise = global.Promise;

require('./logInfo.model');
require('./user.model');