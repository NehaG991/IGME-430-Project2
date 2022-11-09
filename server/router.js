const controllers = require('./controllers');
// const mid = require('./middleware');

const router = (app) => {
  app.get('/', controllers.Account.loginPage);

  app.get('/login', controllers.Account.loginPage);
  app.post('/login', controllers.Account.login);

  app.post('/signup', controllers.Account.signup);

  app.get('/app', controllers.App.appPage);
};

module.exports = router;
