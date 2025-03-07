const {DataTypes} = require('sequelize');

module.exports = model;

function model(sequilize){
    const attributes = {
        email: {type: DataTypes.STRING, allowNull: false},
        passwordHash: {type: DataTypes.STRING, allowNull: false},
        title: {type: DataTypes.STRING, allowNull: false},
        firstName: {type: DataTypes.STRING, allowNull: false},
        lastname: {type: DataTypes.STRING, allowNull: false},
        role: {type: DataTypes.STRING, allowNull: false},
    };

    const options = {
        defaultScope: {
            //exclude password hash by default
            attributes: {exclude: ['passwordHash']}
        },
        scopes: {
            //include hash with this scopre
            withHash: {attributes: {},}
        }
    };

    return sequilize.define('User', attributes, options);
}