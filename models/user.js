const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//I needed to add unique property before collection was created automatically
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: [true, 'Oops! This email is taken']
    },
    password: {
        type: String,
        required: true
    }
});

//'user' is the name of the model which will be created in the database as 'users'
const User = module.exports = mongoose.model('user', userSchema);


module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByEmail = (email, callback) => {
    const query = {email: email}
    User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });   
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}