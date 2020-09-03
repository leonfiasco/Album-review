const jwt = require('jsonwebtoken');

module.exports = ((req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token)
            return res.status(401).json({ message: 'No authentication token, access denied.' });
        // this authenticates the user to access certain paths 
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified)
            return res.status(401).json({ message: 'Token authentication failed, access denied.' });    
        req.user = verified.id
        next();
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
})