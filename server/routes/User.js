var connection = require('../mySqlconnection');
module.exports = function (router,md5,mysql) {

  router.get("/users",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["User"];
      query = mysql.format(query,table);
      connection(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Users" : rows});
          }
      });
  });

  router.get("/users/id/:id_user",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["User","id_user",req.params.id_user];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "User" : row});
          }
      });
  });


  router.post("/users",function(req,res){
      var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
      var table = ["User","name","surname","sex","img_path",req.body.name,req.body.surname,req.body.sex, req.body.img_path];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "User Added !", "User" : row});
          }
      });
  });

  router.put("/users",function(req,res){
      var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
      var table = ["User","name",req.body.name,"sex",req.body.sex,"surname",req.body.surname, "img_path", req.body.img_path, "id_user",req.body.id_user];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "User Updated !", "User" : row});
          }
      });
  });


  router.post("/users/token",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["User","username",req.body.username];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              if (row.length > 0){
                var user = row;
                var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
                var table = ["Token","id_user",user[0].id_user, "token", req.body.token];
                query = mysql.format(query,table);
                connection(query,function(err,row){
                    if(err) {
                        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                    } else {
                        if (row.length > 0){
                            res.json({"Error" : false, "Autenticated" : "True", "User" : user});
                        }
                        else {
                          res.json({"Error" : false, "Autenticated" : "False"});
                        }
                    }
                });

              }
              else {
                res.json({"Error" : false, "Autenticated" : "False", "Message" : "Incorrect user"});
              }

          }
      });
  });

  router.post("/users/logout",function(req,res){
      var query = "DELETE FROM ?? WHERE ??=? and ??=?";
      var table = ["Token","id_user",req.body.id_user,"token",req.body.token];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Success" : false, "Message" : "Error executing MySQL query"});
          } else {
              console.log(row);
              if (row.affectedRows > 0){
                res.json({"Error" : false, "Success" : true, "Message" : "Success, token with id_user = "+req.body.id_user+" deleted"});
              }
              else {
                res.json({"Error" : false, "Success" : false, "Message" : "Not Success, token with id_user = "+req.body.id_user+" doesnt exist"});
              }
          }
      });
  });


  router.delete("/users/id/:id_user",function(req,res){
      var query = "DELETE FROM ?? WHERE ??=?";
      var table = ["User","id_user",req.params.id_user];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success, user with id_user = "+req.params.id_user+" deleted"});
          }
      });
  });

}
