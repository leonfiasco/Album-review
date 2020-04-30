const jwt = require('jsonwebtoken');

module.exports = ((req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // this authenticates the user to access certain paths 
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        //adding a new field within req
        req.userData = decoded;
        next()
    } catch(error) {
        res.status(401).json({
            message: 'Auth failed'
        })
    }
})