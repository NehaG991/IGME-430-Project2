const controllers = require('./controllers');
// const mid = require('./middleware');

const router = (app) => {
  app.get('/', controllers.Account.login);
};

module.exports = router;
