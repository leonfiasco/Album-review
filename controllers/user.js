const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = async (req, res, next) => {
  try {
    const { email, password, passwordConfirmation, displayName } = req.body;

    if (!email || !password || !passwordConfirmation)
     return res.status(400).json({ message: 'Not all fields are completed.' });
 
    if (password.length < 6) 
     return res.status(400).json({ message: 'The password needs be at least 6 characters long.' }); 
 
    if (password !== passwordConfirmation)
     return res.status(400).json({  message: 'Passwords do not match.' }); 

     const existingUser = await User.finf({ email: email })
     if (existingUser) {
       return res.status(400).json({ message: 'This email already exists.' });
     }
      if (!displayName) {
        displayName = email;
      }
  } catch(err) {
    res.status(500).json(err);
  }
  
   
}

exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'email/password incorrect'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'email/password incorrect'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn : '1h'
                        }
                    );
                    return res.status(200).json({
                      message: 'Authentication successful',
                      token: token
                    })
                }
                res.status(401).json({
                  message: 'Auth failed'
                });
            });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });         
       });
}

exports.user_delete = (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'User deleted'
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });    
      });
  }