const seq = require('../db');
const ApiError = require('../error/ApiError');
const {Team, Team_2_Player, Player, User} = require('../models/models');
const uuid = require('uuid');
const path = require('path');

class TeamController {
    async getAll (req, res) {
        // const teams = await Team.findAll();
        const teams = await Team.findAll({
            include: [
                {
                    model: Player,
                    attributes: [],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: User,
                    as: 'leader',
                    attributes: ['id', 'name']
                }
            ],
            attributes: {
                include: [ // this adds AVG attribute to others instead of rewriting
                    [seq.fn('COUNT', seq.col('PLAYERS.id')), 'playerCount'],
                ],
            },
            group: ['Team.id']
        });


        res.status(200);
        return res.json(teams);
    }
    async getOne (req, res, next) {
        const {id} = req.params;
        const team = await Team.findByPk(id);
        const players = await Team_2_Player.findAll({
            where: {
                key_team: id
            },
            attributes: {
                exclude: ['key_team']
            }
        });

        if (!team) {
            return next(ApiError.forbidden("Not found"));
        }
        res.status(200);
        return res.json({...team.dataValues, players});
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