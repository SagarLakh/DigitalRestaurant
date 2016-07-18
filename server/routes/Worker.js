module.exports = function (router,connection,md5,mysql) {


  router.get("/workers",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Worker"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Workers" : rows});
          }
      });
  });

  router.get("/workers/:id_worker",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Worker","id_worker",req.params.id_worker];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Worker" : row});
          }
      });
  });

  router.get("/workers/:id_worker/user",function(req,res){
      var query = "SELECT * FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["User","Worker","Worker","id_user","User","id_user","Worker","id_worker",req.params.id_worker];
      query = mysql.format(query,table);
      console.log(query);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "User + Worker" : row});
          }
      });
  });

  router.get("/workers/:id_worker/nationality",function(req,res){
      var query = "SELECT ??.?? FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Nationality","country_name","Nationality","Worker","Worker","nationality","Nationality","id_nationality","Worker","id_worker",req.params.id_worker];
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


  router.post("/workers",function(req,res){
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
                    res.json({"Error" : false, "Message" : "Worker Added !"});
                }
            });
          }
      });
  });

  router.delete("/workers/:id_worker",function(req,res){
      var query_select = "SELECT id_user FROM ?? WHERE ??=?";
      var table = ["Worker","id_worker",req.params.id_worker];
      query_select = mysql.format(query_select,table);
      connection.query(query_select,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query_select"});
          } else {
            var id_user = row[0].id_user;
            var query_delete = "DELETE FROM ?? WHERE ??=?";
            var table = ["Worker","id_worker",req.params.id_worker];
            query_delete = mysql.format(query_delete,table);
            connection.query(query_delete,function(err,row){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    var query = "DELETE FROM ?? WHERE ??=?";
                    var table = ["User","id_user",id_user];
                    query = mysql.format(query,table);
                    connection.query(query,function(err,row){
                        if(err) {
                            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                        } else {
                          res.json({"Error" : false, "Message" : "Success, worker with id_worker = "+req.params.id_worker+" deleted"});
                        }
                    });
                }
            });
          }
      });
  });

  router.put("/workers",function(req,res){
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
        var table = ["worker","id_number",req.body.id_number,"ss",req.body.ss,"nationality",req.body.nationality,"salary",req.body.salary,"id_worker",req.body.nationality];
        query = mysql.format(query,table);
        connection.query(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the worker with id_worker = "+req.params.id_worker});
            }
        });
    });


}
