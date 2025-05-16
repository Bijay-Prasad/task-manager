const jwt = require('jsonwebtoken');
const User = require('../models/User');


// const findUserById = async (userId) => {
//   const user = await User.findById(userId);
//   if (!user) throw new Error(`User not found with id: ${userId}`);
//   return user;
// };


const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await findUserById(decoded.userId);

    // req.user = {
    //   userId: user._id,
    //   role: user.role,
    //   email: user.email,
    //   name: user.name
    // };

    req.user = decoded;

    // console.log("Decoded user in authMiddleware:", req.user);

    next();
  } catch {
    res.status(401).json({ msg: 'Invalid token' });
  }
};


// const roleCheck = (...allowedRoles) => {
//   return (req, res, next) => {
//     console.log("req.user in roleCheck:", req.user);

//     if (!req.user) {
//       return res.status(403).send({ error: 'User not authenticated' });
//     }

//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).send({ error: 'Access denied' });
//     }

//     next();
//   };
// };

// function roleCheck(allowedRoles) {
//   return (req, res, next) => {
//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).send({ error: 'Access denied' });
//     }

//     console.log("req.user.role:", req.user.role);

//     next();
//   };
// }

module.exports = authMiddleware;