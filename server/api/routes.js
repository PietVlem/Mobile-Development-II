const express = require('express');
const router = express.Router();
const authRouter = express.Router();
const passport = require('passport');

// file upload
const upload = require('./utilities/fileUpload');

// auth helper
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const { validateBody, schemas } = require('./utilities/routeHelpers');
const passportConf = require('../config/pasport');

/*
Controllers
*/
const leagueController = require('./controllers/leagueController');
const authController = require('./controllers/authController');
const blogController = require('./controllers/blogcontroller');
const postController = require('./controllers/postsController');
const CategoryController = require('./controllers/CategoryController');

/*
Routes
*/

/* Testing */
router.get('/', function (req, res) {
    res.send('OMEGALOL - LEAGUE API');
});

// league routes
router.get('/summoner/:summonerName', leagueController.get_champs);

// blogs
router.get('/blogs', blogController.get_blogs);
router.get('/blogs/:id', blogController.get_blog);

// posts
router.get('/posts', postController.get_posts);
router.get('/posts/:postId', postController.get_post);
router.post('/posts', upload.single('postImage'), postController.create_post);
router.delete('/posts/:postId', postController.delete_post);

// categories
router.get('/categories', CategoryController.get_categories);

//auth routes
router.use('/auth', authRouter);
authRouter.post('/signup', validateBody(schemas.authSchema), authController.user_auth_local_signUp);
authRouter.post('/signin', validateBody(schemas.authSchema), authController.user_auth_local_signIn);
authRouter.post('/facebook', passport.authenticate('facebookToken', {session: false}), authController.user_auth_facebook_post);
authRouter.post('/google', passport.authenticate('googleToken', {session: false}), authController.user_auth_google_post);
authRouter.get('/secret', passportJWT, authController.secret);


module.exports = router;