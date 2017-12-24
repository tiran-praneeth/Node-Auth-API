const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});


app.post('/api/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created !',
                authData
            });
        }
    })
});

app.post('/api/login', (req, res) => {

    // Mock user
    const user = {
        id: 1,
        userName: 'tiran',
        email: 'tiranpraneeth@gmail.com'
    }

    jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        res.json({
            token
        });
    });
});

// format of Teken
// Authorization: Bearer <access token>

// verify token
function verifyToken(req, res, next) {
    // get auth header value
    const bearerHeader = req.headers['authorization'];

    // check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {

        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // set the toke 
        req.token = bearerToken;
        // Next middleware
        next();

    } else {
        // Forbidden
        res.sendStatus(403);
    }
}


app.listen(5000, () => {
    console.log('Servere started on port 5000!');
});