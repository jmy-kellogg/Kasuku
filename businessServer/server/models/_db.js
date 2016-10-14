var Sequelize = require('sequelize');

var dbUrl, db;

if (process.env.DATABASE_URL) {
	db = new Sequelize(process.env.DATABASE_URL, {
	  native: true,
	  logging: true,
	  dialectOptions: {
	    supportBigNumbers: true
	  }
	});
} 
else {
	db = new Sequelize('postgres://localhost:5432/chatterbot', {
    	logging: false
	});
}


module.exports = db;