module.exports = function(sequelize, Datatypes){
	var Burger = sequelize.define('Burger', {
		burgerName: {
			type: Datatypes.STRING,
			allowNull: false
		},
		devoured: {
			type: Datatypes.BOOLEAN,
			defaultValue: false
		}
	});
	return Burger;
}