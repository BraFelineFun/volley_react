const seq = require('../db');
const {DataTypes} = require('sequelize');

const User = seq.define('USER',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING},
        email: {type: DataTypes.STRING, unique: true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        image: {type: DataTypes.TEXT},
        role: {
            type: DataTypes.ENUM('guest', 'player', 'leader', 'analyst', 'admin'),
            defaultValue: 'guest',
            allowNull: false
        }
    }
);

const Player = seq.define('PLAYER', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    weight: {type: DataTypes.FLOAT, allowNull: false},
    height: {type: DataTypes.FLOAT, allowNull: false},
})

const Team = seq.define('TEAM', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(30), unique: true, allowNull: false},
    image: {type: DataTypes.STRING},
})

const Team_2_Player = seq.define('TEAM_2_PLAYER', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected', 'left'), // left - игрок покинул команду, rejected - команда выпроводила игрока
        allowNull: false
    }
})


User.hasOne(Player, {
    foreignKey: 'key_user'
});
Player.belongsTo(User, {
    onDelete: 'CASCADE',
    foreignKey: 'key_user'
});

User.hasOne(Team, {
    foreignKey: 'key_leader'
});
Team.belongsTo(User, {
    onDelete: 'SET NULL',
    foreignKey: 'key_leader'
});

Player.belongsToMany(Team, {through: Team_2_Player, foreignKey: 'key_player'});
Team.belongsToMany(Player, {through: Team_2_Player, foreignKey: 'key_team'});

module.exports = {
    User, Player, Team, Team_2_Player
}