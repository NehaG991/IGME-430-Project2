const controllers = require('./controllers');
// const mid = require('./middleware');

const router = (app) => {
  app.get('/', controllers.Account.loginPage);

  app.post('/signup', controllers.Account.signup);

  app.get('/app', controllers.App.appPage);
};

module.exports = router;
