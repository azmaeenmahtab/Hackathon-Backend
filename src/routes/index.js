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

// good architecture but feature based architecture is much better than layered architecture. so we can create a folder for each feature and put all the related files in that folder. for example, we can create a folder for auth feature and put all the auth related files in that folder. then we can import the auth route in this file and add it to the moduleRoutes array. this way we can keep our code organized and maintainable.

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
})

module.exports = router;
