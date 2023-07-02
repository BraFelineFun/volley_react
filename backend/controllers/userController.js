const ApiError = require('../error/ApiError');
const uuid = require("uuid");
const path = require("path");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {User} = require("../models/models");

function generateToken(id, email, name, image, role) {
    return jwt.sign(
        {id, email, name, image, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
}


class UserController {
    async registration (req, res, next) {
        try {
            let {name, email, password, role} = req.body;
            const img = req.files?.img;
            console.log(img)
            name = name || "";

            // Валидируем
            let fileName;
            if (!email || !password|| !role) {
                return next(ApiError.badRequest('Missing required properties'));
            }

            const existingUser = await User.findOne({where: {email}})
            if (existingUser) {
                return next(ApiError.badRequest('User already exists'));
            }

            if (img) {
                fileName = uuid.v4() + ".jpg";
                img.mv(path.resolve(__dirname, '..', 'static', fileName));
            }
            else {
                fileName = "";
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const newUser = await User.create({name, email, password: hashPassword, role, image: fileName})
            const token = generateToken(newUser.id, newUser.email, newUser.name, newUser.image, newUser.role)


            res.status(201);
            return res.json({token});
        }
        catch (e) {
            return next(ApiError.internal(e.message));
        }

    }
    async login (req, res, next) {
        const {email, password} = req.body;
        if (!email || !password) {
            return next(ApiError.notAuthorized("Wrong email or password"));
        }

        const existingUser = await User.findOne({where: {email}});
        if (!existingUser) {
            return next(ApiError.notAuthorized("User not found"));
        }
        const isCorrectPassword = bcrypt.compareSync(password, existingUser.password);
        if (!isCorrectPassword) {
            return next(ApiError.notAuthorized("Wrong email or password"));
        }

        const token = generateToken(existingUser.id, existingUser.email, existingUser.name, existingUser.image, existingUser.role);
        res.status(200);
        return res.json({token});
    }
    async check (req, res, next) {
        const newToken = generateToken()
        res.status(200);
        return res.json({newToken});
    }
}

module.exports = new UserController();