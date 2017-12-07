const UserController = require('../controller/user.js');
const Router = require('koa-router');

const childRouter = new Router();

childRouter.post('/login', UserController.Login);
childRouter.post('/register', UserController.Register);
childRouter.get('/user', UserController.GetAllUsers);
childRouter.post('/deleteUser', UserController.DelUser);

module.exports = childRouter;
