const jwt = require("jsonwebtoken");
const {decode} = require("jsonwebtoken");

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                res.status(401)
                return res.json({message: 'Not authorized'});
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
            if (decoded.role !== role) {
                res.status(403);
                return res.json({message: "Access is restricted due to user rights"});
            }

            next();
        }
        catch (e) {
            res.status(401);
            res.json({message: "Not authorized"});
        }


    }
}
