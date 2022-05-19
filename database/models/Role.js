module.exports = function (sequelize, dataTypes) {
    let alias = "Role";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING,
        }
    };

    let config = {
        tableName: "roles",
        timestamps: false,
    };

    let Role = sequelize.define(alias, cols, config);
    Role.associate = function (models) {
        Role.belongsToMany(models.User, {
            as: "roleUsers",
            through: "users_roles",
            foreingnkey: "users_id",
            otherkey: "roles_id",
            timestamps: false
        })
    }
    return Role;
}