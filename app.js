const env = process.env;
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');

// =======================
// configuration =========
// =======================
const port = env.PORT || 3000;

class DBBrowser {
  constructor() {
    this.app = express();
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));

    this.app.use(express.static('public'));

    this.initRoutes();
  }

  initRoutes() {
    this.app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');

      if (req.method === 'OPTIONS') {
        res.send(200);
      } else {
        next();
      }
    });

    // defining routes.
    routes(this.app);
  }

  start() {
    this.app.listen(port);
  }
}

let dbBrowser = new DBBrowser();
dbBrowser.start();
