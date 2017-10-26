const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const stateSchema = new mongoose.Schema({
    state: {
        type: String,
        required: [true, 'Please enter a state name'],
        trim: true,
        unique: [true, 'Oops! This state already exists']
    },
    capital: {
        type: String,
        required: [true, 'Please enter the state\'s capital'],
        trim: true,
        unique: [true, 'Oops! This capital already exists']
    },
    entry_date: {
        type: Date,
        default: Date.now()
    },
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    }
});

//'state' is the name of the model which will be created in the database as 'states'
const State = module.exports = mongoose.model('state', stateSchema);

// Get all states
module.exports.getStates = (callback) => {
    State.find().exec(callback);
}

// Get state by ID
module.exports.getStatesById = (id, callback) => {
    State.findById(id, callback);
}

// Add state
module.exports.addState = (state, callback) => {
    State.create(state, callback);
}

// Update state: Callback is very crucial
module.exports.updateState = (id, state, options, callback) => {
    let query = {_id: id};
    let update = {
        state: state.state,
        capital: state.capital
    }
    State.findOneAndUpdate(query, update, options, callback);
}

// Add state
module.exports.deleteState = (id, callback) => {
    let query = {_id: id};
    State.remove(query, callback);
}