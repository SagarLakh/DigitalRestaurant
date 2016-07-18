module.exports = function (router,connection,md5,mysql) {

  function generateToken(){
    return Math.random().toString(36).substr(2, 30);
  }

  router.get("/users",function(req,res){
    var token = generateToken();
      console.log(token);
      var query = "SELECT * FROM ??";
      var table = ["User"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
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
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "User" : row});
          }
      });
  });

  router.get("/users/email/:email",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["User","email",req.params.email];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "User" : row});
          }
      });
  });

  router.post("/users",function(req,res){
      var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
      var table = ["User","name","surname","email","username","password","sex",req.body.name,req.body.surname,req.body.email,req.body.username,md5(req.body.password),req.body.sex];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "User Added !"});
          }
      });
  });

  router.post("/users/login",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
      var table = ["User","email",req.body.email,"password",md5(req.body.password)];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              if (row.length > 0){
                res.json({"Error" : false, "Autenticated" : "True", "User" : row});
              }
              else {
                res.json({"Error" : false, "Autenticated" : "False", "Message" : "Incorrect user"});
              }

          }
      });
  });

  router.delete("/users/id/:id_user",function(req,res){
      var query = "DELETE FROM ?? WHERE ??=?";
      var table = ["User","id_user",req.params.id_user];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success, user with id_user = "+req.params.id_user+" deleted"});
          }
      });
  });

  router.delete("/users/email/:email",function(req,res){
      var query = "DELETE FROM ?? WHERE ??=?";
      var table = ["User","email",req.params.email];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success, user with email = "+req.params.email+" deleted"});
          }
      });
  });

  router.put("/users",function(req,res){
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
        var table = ["User","name",req.body.name,"surname",req.body.surname,"email",req.body.email,"username",req.body.username,"sex",req.body.sex,"email",req.body.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the User for email "+req.body.email});
            }
        });
    });

    router.put("/users/password",function(req,res){
          var query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
          var table = ["User","email",req.body.email,"password",md5(req.body.old_password)];
          query = mysql.format(query,table);
          connection.query(query,function(err,row){
              if(err) {
                  res.json({"Error" : true, "Message" : "Error executing MySQL query"});
              } else {
                  if (rows.length > 0){
                    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                    var table = ["User","password",md5(req.body.new_password),"email",req.body.email];
                    query = mysql.format(query,table);
                    connection.query(query,function(err,rows){
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
