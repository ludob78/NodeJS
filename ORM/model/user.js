let {Sequelize}=require('sequelize');
let conf=require('../config');

const sequelize = new Sequelize(conf.db.database, conf.db.user, conf.db.password, {
    host: conf.db.server,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
    // Table created
    return User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
});
module.exports=User;