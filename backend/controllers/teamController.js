const ApiError = require('../error/ApiError');
const {Team} = require('../models/models');
const uuid = require('uuid');
const path = require('path');

class TeamController {
    async getAll (req, res) {
        const teams = await Team.findAll();
        res.status(200);
        return res.json(teams);
    }
    async getOne (req, res, next) {
        const {id} = req.params;
        const team = await Team.findByPk(id)
        if (!team) {
            return next(ApiError.forbidden("Not found"));
        }
        res.status(200);
        return res.json(team);
    }
    async create (req, res, next) {
        try {
            const {name} = req.body;
            const img = req.files?.img;
            let fileName;

            // Валидируем
            if (!name ) {
                return next(ApiError.badRequest('Missing required properties'));
            }
            if (img) {
                fileName = uuid.v4() + ".jpg";
                img.mv(path.resolve(__dirname, '..', 'static', fileName));
            }
            else {
                fileName = "";
            }

            const newTeam = await Team.create({name, image: fileName})
            res.status(201);
            return res.json(newTeam);
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }

    }
}

module.exports = new TeamController();