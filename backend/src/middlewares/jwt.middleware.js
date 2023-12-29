const jwt = require('jsonwebtoken');

const jwtToken = {};

// Middleware para verificar JWT
jwtToken.verifyJwt = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token no proporcionado' });

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        next();
    });
}

module.exports = jwtToken;