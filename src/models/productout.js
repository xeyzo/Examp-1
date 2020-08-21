'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductOut extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ProductOut.belongsTo(models.Product, {as: 'product', foreignKey: 'productId', foreignKeyConstrain: true});
        }

    };
    ProductOut.init({
        date: DataTypes.STRING,
        total: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'ProductOut',
    });
    return ProductOut;
};