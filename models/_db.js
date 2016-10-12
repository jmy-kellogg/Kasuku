var Sequelize = require('sequelize');

var dbUrl

// if (process.env.DATABASE_URL) {
//   dbUrl = process.env.DATABASE_URL
// } else {
//   dbUrl = 'postgres://abrjhrggwxjqut:aL1ivszolwho7m4Ly4W2LUC44x@ec2-54-243-203-93.compute-1.amazonaws.com:5432/dj92utpsnn9vj'
// }

if (!process.env.DATABASE_URL) {
  console.log("DATABASE_URL not defined");
  process.exit(0);
}

var db = new Sequelize(process.env.DATABASE_URL, {
  native: true,
  logging: true,
  dialectOptions: {
    supportBigNumbers: true
  }
});

module.exports = db;

