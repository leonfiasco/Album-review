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
        .json({ msg: "Passwords do not match" });

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

 exports.user_login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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