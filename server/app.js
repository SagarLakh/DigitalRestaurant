var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
//var rest = require("./REST.js");
var app  = express();
var cors = require("cors");

function REST(){
    var self = this;
    self.connectMysql();
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

REST.prototype.connectMysql = function() {
    var self = this;
    self.configureExpress();
}
REST.prototype.configureExpress = function() {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
      app.use(bodyParser.json({limit: '50mb'}));
      var router = express.Router();
      app.use('/api', router);
      require('./routes/User.js')(router,md5,mysql);
      require('./routes/Worker.js')(router,md5,mysql);
      require('./routes/Client.js')(router,md5,mysql);
      require('./routes/Waiter.js')(router,md5,mysql);
      require('./routes/Chef.js')(router,md5,mysql);
      require('./routes/Admin.js')(router,md5,mysql);
      require('./routes/Restaurant.js')(router,md5,mysql);
      require('./routes/RegisteredUser.js')(router,md5,mysql);
      require('./routes/Menu.js')(router,md5,mysql);
      require('./routes/Administration.js')(router,md5,mysql);
      require('./routes/Dish.js')(router,md5,mysql);
      require('./routes/ListDishes.js')(router,md5,mysql);
      require('./routes/Type_Dish.js')(router,md5,mysql);
      require('./routes/Range.js')(router,md5,mysql);
      require('./routes/Table.js')(router,md5,mysql);
      require('./routes/Station.js')(router,md5,mysql);
      require('./routes/Guest.js')(router,md5,mysql);
      require('./routes/Sit.js')(router,md5,mysql);
      require('./routes/Order.js')(router,md5,mysql);
      require('./routes/Allergy.js')(router,md5,mysql);
      require('./routes/ListAllergies.js')(router,md5,mysql);
      require('./routes/ListStations.js')(router,md5,mysql);
      require('./routes/Nationality.js')(router,md5,mysql);
      require('./routes/Image.js')(router,md5,mysql);
      //var rest_router = new rest(router,md5);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.use(cors());
      app.listen(8080,function(){
          console.log("All right ! I am alive at Port 8080.");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL " + err);
    process.exit(1);
}

new REST();
