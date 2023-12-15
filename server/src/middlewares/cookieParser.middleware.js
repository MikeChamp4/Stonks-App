const cookieParser = require('cookie-parser');

const cookies = {};

cookies.saveCookie = (req, res, next) => {
  cookieParser()(req, res, () => {});
  res.cookie('Cookie Miguel', 'Miguel Cookie', {
    maxAge: 5000,
  } );
  next();
};

module.exports = cookies;