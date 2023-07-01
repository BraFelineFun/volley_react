const ApiError = require('../error/ApiError');

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        res.status(err.status);
        res.json({message: err.message})
        return res;
    }
    else {
        res.status(500);
        res.json({message: "Непредвиденная ошибка"})
        return res;
    }


}