const controllers = require('./controllers');
// const mid = require('./middleware');

const router = (app) => {
  app.get('/', controllers.Home.homePage);
};

module.exports = router;
