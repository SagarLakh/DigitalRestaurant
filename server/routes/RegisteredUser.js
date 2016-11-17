var connection = require('../mySqlconnection');
module.exports = function (router,md5,mysql) {

  function generateToken(){
    return Math.random().toString(36).substr(2, 30);
  }

  function generateToken32()
  {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 32; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
  }

  router.get("/registeredusers",function(req,res){
    var token = generateToken();
      console.log(token);
      var query = "SELECT * FROM ??";
      var table = ["Registered_User"];
      query = mysql.format(query,table);
      connection(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Users" : rows});
          }
      });
  });

  router.get("/registeredusers/id/:id_registered_user",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Registered_User","id_registered_user",req.params.id_registered_user];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "User" : row});
          }
      });
  });

  router.get("/registeredusers/:id_registered_user_md5/admin",function(req,res){
      var query = "SELECT * FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Registered_User","Admin","Admin","id_registered_user","Registered_User","id_registered_user","Admin","id_admin",req.params.id_admin];
      query = mysql.format(query,table);
      console.log(query);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Worker + Admin" : row});
          }
      });
  });



  router.post("/registeredusers",function(req,res){
      var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
      var table = ["User","name","surname","sex",req.body.name,req.body.surname,req.body.sex];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding User)", "Error" : err});
          } else {
            console.log(row);
            var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
            var table = ["Registered_User","id_user","email","username","password",row.insertId,req.body.email,req.body.username,md5(req.body.password)];
            query = mysql.format(query,table);
            console.log(query);
            connection(query,function(err,row){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding Worker)"});
                } else {
                    res.json({"Error" : false, "Message" : "Registered User Added !"});
                }
            });
          }
      });
  });

  router.post("/registeredusers/login",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
      var table = ["Registered_User","email",req.body.email,"password",md5(req.body.password)];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              if (row.length > 0){
                var user = row;
                var token = generateToken32();
                var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
                console.log(row[0]);
                var table = ["Token","id_registered_user","token", "os", row[0].id_registered_user, token, req.body.app_version ];
                query = mysql.format(query,table);
                connection(query,function(err,row){
                    if(err) {
                        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                    } else {
                        res.json({"Error" : false, "Autenticated" : "True", "User" : user, "Token" : token});
                    }
                });

              }
              else {
                res.json({"Error" : false, "Autenticated" : "False", "Message" : "Incorrect user"});
              }

          }
      });
  });

  router.post("/registeredusers/logout",function(req,res){
      var query = "DELETE FROM ?? WHERE ??=? and ??=?";
      var table = ["Token","id_registered_user",req.body.id_registered_user,"token",req.body.token];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Success" : true, "Message" : "Logout correctly done"});
                    }
      });
  });

  router.post("/registeredusers/token",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Registered_User","username",req.body.username];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              if (row.length > 0){
                var user = row;
                var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
                var table = ["Token","id_registered_user",user[0].id_registered_user, "token", req.body.token];
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

  router.post("/registeredusers/logout",function(req,res){
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


  router.delete("/registeredusers/id/:id_user",function(req,res){
      var query = "DELETE FROM ?? WHERE ??=?";
      var table = ["Registered_User","id_user",req.params.id_user];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success, user with id_user = "+req.params.id_user+" deleted"});
          }
      });
  });

  router.delete("/registeredusers/:id_registered_user",function(req,res){
      var query_select = "SELECT id_registered_user FROM ?? WHERE ??=?";
      var table = ["Registered_User","id_registered_user",req.params.id_registered_user];
      query_select = mysql.format(query_select,table);
      connection(query_select,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query_select"});
          } else {
            var id_user = row[0].id_user;
            var query_delete = "DELETE FROM ?? WHERE ??=?";
            var table = ["Registered_User","id_registered_user",req.params.id_registered_user];
            query_delete = mysql.format(query_delete,table);
            connection(query_delete,function(err,row){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    var query = "DELETE FROM ?? WHERE ??=?";
                    var table = ["User","id_user",id_user];
                    query = mysql.format(query,table);
                    connection(query,function(err,row){
                        if(err) {
                            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                        } else {
                          res.json({"Error" : false, "Message" : "Success, Registered User with id_registered_user = "+req.params.id_registered_user+" deleted"});
                        }
                    });
                }
            });
          }
      });
  });

 
  router.put("/registeredusers",function(req,res){
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
        var table = ["Registered_User","email",req.body.email,"username",req.body.username,"password", md5(req.body.password),"id_registered_user",req.body.id_registered_user];
        query = mysql.format(query,table);
        connection(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the User for id_registered_user "+req.body.id_registered_user});
            }
        });
    });

    router.put("/registeredusers/password",function(req,res){
          var query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
          var table = ["Registered_User","email",req.body.email,"password",md5(req.body.old_password)];
          query = mysql.format(query,table);
          connection(query,function(err,row){
              if(err) {
                  res.json({"Error" : true, "Message" : "Error executing MySQL query"});
              } else {
                  if (rows.length > 0){
                    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                    var table = ["Registerd_User","password",md5(req.body.new_password),"email",req.body.email];
                    query = mysql.format(query,table);
                    connection(query,function(err,rows){
                        if(err) {
                            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                        } else {
                            res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
                        }
                    });
                  }
                  else {
                    res.json({"Error" : false, "Autenticated" : "False", "Message" : "Incorrect credentials"});
                  }

              }
          });
      });
}
