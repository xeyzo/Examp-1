'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Product.belongsTo(models.User, {as: 'user', foreignKey: 'userId', foreignKeyConstrain: true});
            this.hasMany(models.ProductIn, { foreignKeyConstraint: true });
            this.hasMany(models.ProductOut, { foreignKeyConstraint: true });
        }

    };
    Product.init({
        name: DataTypes.STRING,
        stock: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};