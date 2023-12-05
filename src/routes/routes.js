const { homepage, signup_get, login_get, signup_post, login_post, welcome, logout } = require('../controllers/controllers');
const {saferoute}=require('../middlewares/jwtverify');
const router=require('express').Router();
router.use(require('express').json());


router.get('/',homepage);
router.route('/signup').get(signup_get).post(signup_post)
router.route('/login').get(login_get).post(login_post);
router.route('/welcome').get(saferoute,welcome);
router.route('/logout').get(logout);

module.exports=router