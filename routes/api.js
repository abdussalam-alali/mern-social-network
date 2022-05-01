const express = require('express');
const router = express.Router();
const userRoutes = require('./api/user');
const authRoutes = require('./api/auth')
const postsRoutes = require('./api/posts');
const profileRoutes = require('./api/profile');
const apiRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/posts',
        route: postsRoutes,
    },
    {
        path: '/profile',
        route: profileRoutes,
    },
    {
        path: '/auth',
        route: authRoutes,
    }
];

apiRoutes.forEach((route)=>
    router.use(route.path,route.route)
);

module.exports = router;