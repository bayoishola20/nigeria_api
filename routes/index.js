const express = require ('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Models
const State = require('../models/state');
const User = require('../models/user');

router.post('/admin_register', (req, res) => {
    let newUser = new User ({
        email: req.body.email,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) res.json({success: false, msg: 'Already an Admin'});
            else res.json({success: true, msg: 'Admin registered'});
    })
});

// Admin user route
router.post('/admin', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({success: false, msg: 'Not an admin'});

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: "Invalid password!"});
            }
        });
    });
});


// States Routes

router.get('/state', (req, res) => {
    State.getStates((err, states) => {
        if (err) res.json({success: false, msg: "Invalid state"});
        res.json(states);
    });
});

router.get('/state/:_id', (req, res) => {
    State.getStatesById(req.params._id, (err, states) => {
        if (err) res.json({success: false, msg: "Invalid state"});
        res.json(states);
    });
});

router.post('/state', passport.authenticate('jwt', {session: false}), (req, res) => {
    let state = req.body;
    State.addState(state, (err, state) => {
        if (err) res.json({success: false, msg: "Unable to add state..."});
        res.json(state);
    });
});

router.put('/state/:_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    let id = req.params._id;
    let state = req.body;
    State.updateState(id, state, {}, (err, state) => {
        if (err) res.json({success: false, msg: "Unable to update state..."});
        res.json(state);
    });
});

router.delete('/state/:_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    let id = req.params._id;
    let state = req.body;
    State.deleteState(id, state, {}, (err, state) => {
        if (err) res.json({success: false, msg: "Unable to delete state..."});
        res.json({ state, success: true, msg: "State deleted..."});
    });
});

module.exports = router;