// middleware/authenticate.js
import jwt from 'jsonwebtoken';
import User from '../api/models/User.js'; // Adjust the path according to your project structure

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Please authenticate.' });
    }
};

export default authenticate;
