const { Router } = require('express');
// const AuthRouter = require('../modules/auth/auth.route'); example


const router = Router();

const moduleRoutes = [
    {
        // path: "/auth",
        // route: AuthRouter
    },
    // Add more module routes here

];


moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
})

module.exports = router;
