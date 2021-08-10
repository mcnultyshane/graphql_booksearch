const jwt = require('jsonwebtoken');
require('dotenv').config

// set token secret and expiration date
const secret = process.env.SECRET;
const expiration = '2h';

module.exports = {
  signToken: function({ username, email, _id}) {
    // create a token with the username, email and id, signed with the secret
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration});

  },
  authMiddleware: function({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // if by headers, remove "Bearer" from "<tokenvalue>" value and return just the token value
    if (req.headers.authorization) {
        token = token
            .split(' ')
            .pop()
            .trim();
    }
    // if there is no token, return the request object as sent
    if (!token) {
        return req;
    }
    // otherwise...
    try {
        // decode and attach user data to the request object
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
    } catch {
        console.log('Invalid token');
    }
    // return the updated request object
    return req;
  }
};


