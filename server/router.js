const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getLogInTweets', mid.requiresLogin, controllers.App.getLogInTweets);
  app.get('/getPublicTweets', mid.requiresLogout, controllers.App.getPublicTweets);
  app.get('/getUsername', mid.requiresLogin, controllers.Account.getUsername);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/app', mid.requiresLogin, controllers.App.appPage);
  app.post('/app', mid.requiresLogin, controllers.App.makeTweet);
};

module.exports = router;
