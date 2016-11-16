var connection = require('../mySqlconnection');
module.exports = function (router,md5,mysql) {


  router.get("/admins",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Admin"];
      query = mysql.format(query,table);
      connection(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Admins" : rows});
          }
      });
  });

  router.get("/admins/:id_admin",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Admin","id_admin",req.params.id_admin];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Admin" : row});
          }
      });
  });

  router.get("/admins/registereduser/:id_registered_user",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Admin","id_registered_user",req.params.id_registered_user];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Admin" : row});
          }
      });
  });

  router.get("/admins/:id_admin/registereduser",function(req,res){
      var query = "SELECT * FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Registered_User","Admin","Admin","id_registered_user","Registered_User","id_registered_user","Admin","id_admin",req.params.id_admin];
      query = mysql.format(query,table);
      console.log(query);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "RegisteredUser" : row});
          }
      });
  });


  router.get("/admins/:id_admin/restaurants",function(req,res){
      var query = "SELECT ??.* FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Restaurant","Restaurant","Administration","Administration","id_restaurant","Restaurant","id_restaurant","Administration","id_admin",req.params.id_admin];
      query = mysql.format(query,table);
      console.log(query);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Restaurant" : row});
          }
      });
  });


  router.post("/admins",function(req,res){
      var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
      var table = ["User","name","surname","email","username","password","sex",req.body.name,req.body.surname,req.body.email,req.body.username,md5(req.body.password),req.body.sex];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding User)", "Error" : err});
          } else {
            console.log(row);
            var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
            var table = ["Worker","id_user","id_number","ss","nationality","salary",row.insertId,req.body.id_number,req.body.ss,req.body.nationality,req.body.salary];
            query = mysql.format(query,table);
            console.log(query);
            connection(query,function(err,row){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding Worker)"});
                } else {
                  var query = "INSERT INTO ??(??) VALUES (?)";
                  var table = ["Admin","id_worker",row.insertId];
                  query = mysql.format(query,table);
                  console.log(query);
                  connection(query,function(err,row){
                      if(err) {
                          res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding admin)"});
                      } else {
                          res.json({"Error" : false, "Message" : "Admin Added !"});
                      }
                  });
                }
            });
          }
      });
  });

  router.post("/admins/restaurant",function(req,res){
      var query = "INSERT INTO ??(??,??) VALUES (?,?)";
      var table = ["Administration","id_admin","id_restaurant",req.body.id_admin,req.body.id_restaurant];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding User)", "Error" : err});
          } else {
              res.json({"Error" : false, "Message" : "Restaurant assigned correctly!"});
          }
      });
  });

  router.delete("/admins/:id_admin",function(req,res){
      var query_select = "SELECT id_worker FROM ?? WHERE ??=?";
      var table = ["admin","id_admin",req.params.id_admin];
      query_select = mysql.format(query_select,table);
      connection(query_select,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query select admin"});
          }
          else if (row.length == 0) {
              res.json({"Error" : false, "Message" : "admin doesn't exist"});
          }
          else {
            console.log(row);
            var id_worker = row[0].id_worker;
            var query = "SELECT id_user FROM ?? WHERE ??=?";
            var table = ["Worker","id_worker",id_worker];
            query = mysql.format(query,table);
            console.log(query);
            connection(query,function(err,row){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query select worker"});
                }
                else if (row.length == 0) {
                    res.json({"Error" : false, "Message" : "admin doesn't exist"});
                }
                else {
                  var id_user = row[0].id_user;
                  var query_delete = "DELETE FROM ?? WHERE ??=?";
                  var table = ["Admin","id_admin",req.params.id_admin];
                  query_delete = mysql.format(query_delete,table);
                  console.log(query_delete);
                  connection(query_delete,function(err,row){
                      if(err) {
                          res.json({"Error" : true, "Message" : "Error executing MySQL query deleting admin"});
                      } else {
                          var query = "DELETE FROM ?? WHERE ??=?";
                          var table = ["Worker","id_worker",id_worker];
                          query = mysql.format(query,table);
                          console.log(query);
                          connection(query,function(err,row){
                              if(err) {
                                  res.json({"Error" : true, "Message" : "Error executing MySQL query deleting worker"});
                              } else {
                                var query = "DELETE FROM ?? WHERE ??=?";
                                var table = ["User","id_user",id_user];
                                query = mysql.format(query,table);
                                console.log(query);
                                connection(query,function(err,row){
                                    if(err) {
                                        res.json({"Error" : true, "Message" : "Error executing MySQL query deleting user"});
                                    } else {
                                      res.json({"Error" : false, "Message" : "Success, admin with id_admin = "+req.params.id_admin+" deleted"});
                                    }
                                });                              }
                          });
                      }
                  });
                }
            });
          }
      });
  });




}
