const {Player} = require("../models/models");
const ApiError = require("../error/ApiError");

class PlayerController {
    async getAll (req, res) {
        const players = await Player.findAll();
        res.status(200);
        return res.json(players);
    }
    async getOne (req, res, next) {
        const {id} = req.params;
        const player = await Player.findByPk(id)
        if (!player) {
            return next(ApiError.forbidden("Not found"));
        }
        res.status(200);
        return res.json(player);
    }
    async create (req, res, next) {
        try {
            const {weight, height, key_user} = req.body;
            if (weight === undefined ||
                height === undefined ||
                key_user === undefined)
            {
                return next(ApiError.badRequest('Missing required properties'));
            }


            const newPlayer = await Player.create({weight, height, key_user});
            res.status(201);
            return res.json(newPlayer);
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }



    }
}

module.exports = new PlayerController();