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
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'localhost',
        port     : '3306',
        user     : 'root',
        password : 'root',
        database : 'EssenEasy',
        debug    :  true
    });

    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}
REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/api', router);
      require('./routes/User.js')(router,connection,md5,mysql);
      require('./routes/Worker.js')(router,connection,md5,mysql);
      require('./routes/Client.js')(router,connection,md5,mysql);
      require('./routes/Waiter.js')(router,connection,md5,mysql);
      require('./routes/Chef.js')(router,connection,md5,mysql);
      require('./routes/Admin.js')(router,connection,md5,mysql);
      require('./routes/Restaurant.js')(router,connection,md5,mysql);
      require('./routes/RegisteredUser.js')(router,connection,md5,mysql);
      require('./routes/Menu.js')(router,connection,md5,mysql);
      require('./routes/Administration.js')(router,connection,md5,mysql);
      require('./routes/Dish.js')(router,connection,md5,mysql);
      require('./routes/ListDishes.js')(router,connection,md5,mysql);
      //var rest_router = new rest(router,connection,md5);
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
