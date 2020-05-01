const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup =  async (req, res) => {
  try {
    let { email, password, passwordconfirm, displayName } = req.body;

    // validate

    if (!email || !password || !passwordconfirm)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordconfirm)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });

    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

     if (!displayName) {
      displayName = email;
     } 

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: email,
      password: passwordHash,
      passwordconfirm,
      displayName
    });

    const savedUser = await await user.save();
    res.json(savedUser)


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

 exports.user_login = (req, res, next) => {
  try {
    let { email, password } = req.body;
    
    if (!email || !password)
      res.status(400).json({ message: "Not all fields have been entered." });
    
    const user = await User.findOne({ email: email });
      if (!user)
        res.status(400).json({ message: 'No account with this email exists' });

    const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch)
        res.status(400).json({ message: 'invalid password *change this ASAP*' })

  } catch(err) {

  }
}

//exports.user_delete = (req, res, next) => {
    // User.remove({ _id: req.params.userId })
    //   .exec()
    //   .then(result => {
    //     res.status(200).json({
    //       message: 'User deleted'
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     res.status(500).json({
    //       error: err
    //     });    
    //   });
  //}