var connection = require('../mySqlconnection');
module.exports = function (router,md5,mysql) {

  function ISODateString(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
        + pad(d.getUTCMonth()+1)+'-'
        + pad(d.getUTCDate()) +' '
        + pad(d.getUTCHours())+':'
        + pad(d.getUTCMinutes())+':'
        + pad(d.getUTCSeconds())
  }

  router.get("/chefs",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Chef"];
      query = mysql.format(query,table);
      connection(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Chefs" : rows});
          }
      });
  });

  router.get("/chefs/:id_chef",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Chef","id_chef",req.params.id_chef];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Chef" : row});
          }
      });
  });

  router.get("/chefs/restaurant/:id_restaurant",function(req,res){
      var query = "SELECT * FROM ?? JOIN ?? ON ??.?? = ??.?? JOIN ?? ON ??.?? = ??.?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["User","Worker","Worker","id_user","User","id_user","Chef","Chef","id_worker","Worker","id_worker","Nationality","Nationality","id_nationality","Worker","id_nationality", "Worker","id_restaurant",req.params.id_restaurant];
      query = mysql.format(query,table);
      console.log(query);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Chefs" : row});
          }
      });
  });

  router.get("/chefs/:id_chef/worker",function(req,res){
      var query = "SELECT * FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Worker","Chef","Chef","id_worker","Worker","id_worker","Chef","id_chef",req.params.id_chef];
      query = mysql.format(query,table);
      console.log(query);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Worker + Chef" : row});
          }
      });
  });

  router.get("/chefs/:id_chef/user",function(req,res){
      var query = "SELECT * FROM ?? JOIN ?? ON ??.?? = ??.?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["User","Worker","Worker","id_user","User","id_user","Chef","Chef","id_worker","Worker","id_worker","Chef","id_chef",req.params.id_chef];
      query = mysql.format(query,table);
      console.log(query);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "User + Worker + Chef" : row});
          }
      });
  });

  router.get("/chefs/:id_chef/orders",function(req,res){
      var query = "SELECT ??.* FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Order","Order","Chef","Chef","id_chef","Order","id_chef","Chef","id_chef",req.params.id_chef];
      query = mysql.format(query,table);
      console.log(query);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Order" : row});
          }
      });
  });

  router.get("/chefs/:id_chef/restaurant",function(req,res){
      var query = "SELECT ??.* FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Restaurant","Restaurant","Chef","Chef","id_restaurant","Restaurant","id_restaurant","Chef","id_restaurant",req.params.id_chef];
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


  /*router.post("/chefs",function(req,res){
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
                  var query = "INSERT INTO ??(??,??) VALUES (?,?)";
                  var table = ["Chef","id_worker","id_restaurant",row.insertId,req.body.id_restaurant];
                  query = mysql.format(query,table);
                  console.log(query);
                  connection(query,function(err,row){
                      if(err) {
                          res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding Chef)"});
                      } else {
                          res.json({"Error" : false, "Message" : "Chef Added !"});
                      }
                  });
                }
            });
          }
      });
  });*/



  router.delete("/chefs/:id_chef",function(req,res){
      var query_select = "SELECT id_worker FROM ?? WHERE ??=?";
      var table = ["Chef","id_chef",req.params.id_chef];
      query_select = mysql.format(query_select,table);
      connection(query_select,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query select chef"});
          }
          else if (row.length == 0) {
              res.json({"Error" : false, "Message" : "Chef doesn't exist"});
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
                    res.json({"Error" : false, "Message" : "Chef doesn't exist"});
                }
                else {
                  var id_user = row[0].id_user;
                  var query_delete = "DELETE FROM ?? WHERE ??=?";
                  var table = ["Chef","id_chef",req.params.id_chef];
                  query_delete = mysql.format(query_delete,table);
                  console.log(query_delete);
                  connection(query_delete,function(err,row){
                      if(err) {
                          res.json({"Error" : true, "Message" : "Error executing MySQL query deleting chef"});
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
                                      res.json({"Error" : false, "Message" : "Success, chef with id_chef = "+req.params.id_chef+" deleted"});
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

  router.post("/chefs",function(req,res){ 
    var query = "INSERT INTO ??(??) VALUES (?)";
    var table = ["Chef","id_worker",req.body.id_worker];
    query = mysql.format(query,table);
    console.log(query);
    connection(query,function(err,row){
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding Chef)"});
        } else {
            res.json({"Error" : false, "Message" : "Chef Added !", "Chef" : row});
        }
    });
  });
  

  router.put("/chefs",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["Chef","id_restaurant",req.body.id_restaurant,"id_chef",req.body.id_chef];
        query = mysql.format(query,table);
        connection(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the chef with id_chef = "+req.body.id_chef});
            }
        });
    });


}
