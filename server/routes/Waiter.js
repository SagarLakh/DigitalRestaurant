module.exports = function (router,connection,md5,mysql) {

  function ISODateString(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
        + pad(d.getUTCMonth()+1)+'-'
        + pad(d.getUTCDate()) +' '
        + pad(d.getUTCHours())+':'
        + pad(d.getUTCMinutes())+':'
        + pad(d.getUTCSeconds())
  }

  router.get("/waiters",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Waiter"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Waiters" : rows});
          }
      });
  });

  router.get("/waiters/:id_waiter",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["waiter","id_waiter",req.params.id_waiter];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Waiter" : row});
          }
      });
  });

  router.get("/waiters/:id_waiter/worker",function(req,res){
      var query = "SELECT * FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Worker","Waiter","Waiter","id_worker","Worker","id_worker","Waiter","id_waiter",req.params.id_waiter];
      query = mysql.format(query,table);
      console.log(query);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Worker + Waiter" : row});
          }
      });
  });

  router.get("/waiters/:id_waiter/user",function(req,res){
      var query = "SELECT * FROM ?? JOIN ?? ON ??.?? = ??.?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["User","Worker","Worker","id_user","User","id_user","Waiter","Waiter","id_worker","Worker","id_worker","Waiter","id_waiter",req.params.id_waiter];
      query = mysql.format(query,table);
      console.log(query);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "User + Worker + Waiter" : row});
          }
      });
  });

  router.get("/waiters/restaurant/:id_restaurant",function(req,res){
      var query = "SELECT * FROM ?? JOIN ?? ON ??.?? = ??.?? JOIN ?? ON ??.?? = ??.?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["User","Worker","Worker","id_user","User","id_user","Waiter","Waiter","id_worker","Worker","id_worker","Nationality","Nationality","id_nationality","Worker","id_nationality", "Worker","id_restaurant",req.params.id_restaurant];
      query = mysql.format(query,table);
      console.log(query);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Waiters" : row});
          }
      });
  });

  router.get("/waiters/:id_waiter/tables",function(req,res){
      var query = "SELECT ??.??, ??.??, ??.?? FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Workday","id_table","Workday","hour_ini","Workday","hour_end","Workday","Waiter","Waiter","id_waiter","Workday","id_waiter","Waiter","id_waiter",req.params.id_waiter];
      query = mysql.format(query,table);
      console.log(query);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Tables" : row});
          }
      });
  });

  router.get("/waiters/:id_waiter/activeTables",function(req,res){
      var currentDate = new Date();
      currentDate = ISODateString(currentDate);
      console.log(currentDate);
      var query = "SELECT ??.??, ??.??, ??.?? FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=? AND ??.?? <= ? AND ??.?? >= ?";
      var table = ["Workday","id_table","Workday","hour_ini","Workday","hour_end","Workday","Waiter","Waiter","id_waiter","Workday","id_waiter","Waiter","id_waiter",req.params.id_waiter,"Workday","hour_ini",currentDate,"Workday","hour_end",currentDate];
      query = mysql.format(query,table);
      console.log(query);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Nationality" : row});
          }
      });
  });

  router.get("/waiters/:id_waiter/restaurant",function(req,res){
      var query = "SELECT ??.?? FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Restaurant","*","Restaurant","Waiter","Waiter","id_restaurant","Restaurant","id_restaurant","Waiter","id_restaurant",req.params.id_waiter];
      query = mysql.format(query,table);
      console.log(query);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Restaurant" : row});
          }
      });
  });


  router.post("/waiters",function(req,res){
      var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
      var table = ["User","name","surname","email","username","password","sex",req.body.name,req.body.surname,req.body.email,req.body.username,md5(req.body.password),req.body.sex];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding User)", "Error" : err});
          } else {
            console.log(row);
            var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
            var table = ["Worker","id_user","id_number","ss","nationality","salary",row.insertId,req.body.id_number,req.body.ss,req.body.nationality,req.body.salary];
            query = mysql.format(query,table);
            console.log(query);
            connection.query(query,function(err,row){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding Worker)"});
                } else {
                  var query = "INSERT INTO ??(??,??) VALUES (?,?)";
                  var table = ["Waiter","id_worker","id_restaurant",row.insertId,req.body.id_restaurant];
                  query = mysql.format(query,table);
                  console.log(query);
                  connection.query(query,function(err,row){
                      if(err) {
                          res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding Waiter)"});
                      } else {
                          res.json({"Error" : false, "Message" : "Waiter Added !"});
                      }
                  });
                }
            });
          }
      });
  });

  router.delete("/waiters/:id_waiter",function(req,res){
      var query_select = "SELECT id_worker FROM ?? WHERE ??=?";
      var table = ["Waiter","id_waiter",req.params.id_waiter];
      query_select = mysql.format(query_select,table);
      connection.query(query_select,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query select waiter"});
          }
          else if (row.length == 0) {
              res.json({"Error" : false, "Message" : "Waiter doesn't exist"});
          }
          else {
            console.log(row);
            var id_worker = row[0].id_worker;
            var query = "SELECT id_user FROM ?? WHERE ??=?";
            var table = ["Worker","id_worker",id_worker];
            query = mysql.format(query,table);
            console.log(query);
            connection.query(query,function(err,row){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query select worker"});
                }
                else if (row.length == 0) {
                    res.json({"Error" : false, "Message" : "Waiter doesn't exist"});
                }
                else {
                  var id_user = row[0].id_user;
                  var query_delete = "DELETE FROM ?? WHERE ??=?";
                  var table = ["Waiter","id_waiter",req.params.id_waiter];
                  query_delete = mysql.format(query_delete,table);
                  console.log(query_delete);
                  connection.query(query_delete,function(err,row){
                      if(err) {
                          res.json({"Error" : true, "Message" : "Error executing MySQL query deleting waiter"});
                      } else {
                          var query = "DELETE FROM ?? WHERE ??=?";
                          var table = ["Worker","id_worker",id_worker];
                          query = mysql.format(query,table);
                          console.log(query);
                          connection.query(query,function(err,row){
                              if(err) {
                                  res.json({"Error" : true, "Message" : "Error executing MySQL query deleting worker"});
                              } else {
                                var query = "DELETE FROM ?? WHERE ??=?";
                                var table = ["User","id_user",id_user];
                                query = mysql.format(query,table);
                                console.log(query);
                                connection.query(query,function(err,row){
                                    if(err) {
                                        res.json({"Error" : true, "Message" : "Error executing MySQL query deleting user"});
                                    } else {
                                      res.json({"Error" : false, "Message" : "Success, Waiter with id_waiter = "+req.params.id_waiter+" deleted"});
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

  router.put("/waiters",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["Waiter","id_restaurant",req.body.id_restaurant,"id_waiter",req.body.id_waiter];
        query = mysql.format(query,table);
        connection.query(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the waiter with id_waiter = "+req.body.id_waiter});
            }
        });
    });


}
