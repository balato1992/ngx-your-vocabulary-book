import * as mongoose from 'mongoose';

const LogInfo = mongoose.model('LogInfo');

export function getLogInfos(req, res) {
    const docquery = LogInfo.find({});
    docquery
        .exec()
        .then(infos => {
            res.status(200).json(infos);
        })
        .catch(error => {
            res.status(500).send(error);
            return;
        });
}

export function _setLogInfos(str1, str2 = null) {
    const logInfo = new LogInfo({ str1: str1, str2: str2 });
    logInfo.save(error => {
        if (error) {
            console.log('logInfo created failed!');
            return;
        }

        console.log('logInfo created successfully!');
    });
}
