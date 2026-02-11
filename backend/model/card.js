
module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define("card", {
        cardNumber: { type: DataTypes.STRING, allowNull: false, },
    });
    return Card
}