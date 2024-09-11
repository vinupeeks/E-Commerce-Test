const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        console.log(req.user);

        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

exports.admin = (req, res, next) => {
    console.log(req.user.isAdmin);
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
        throw new Error(msg);
    }
};
