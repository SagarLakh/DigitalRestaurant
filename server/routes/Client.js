module.exports = function (router,connection,md5,mysql) {


  router.get("/clients",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Client"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Clients" : rows});
          }
      });
  });

  router.get("/clients/:id_client",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Client","id_client",req.params.id_client];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Client" : row});
          }
      });
  });

  router.get("/clients/:id_client/registereduser",function(req,res){
      var query = "SELECT * FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Registered_User","Client","Client","id_registered_user","Registered_User","id_registered_user","Client","id_client",req.params.id_client];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Registered_User" : rows});
          }
      });
  });

  router.get("/clients/registereduser/:id_registered_user",function(req,res){
      var query = "SELECT * FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Registered_User","Client","Client","id_registered_user","Registered_User","id_registered_user","Registered_User","id_registered_user",req.params.id_registered_user];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Registered_User" : rows});
          }
      });
  });

  router.get("/clients/:id_client/user",function(req,res){
      var query = "SELECT * FROM ?? JOIN ?? ON ??.?? = ??.?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Client","Registered_User","Client","id_registered_user","Registered_User","id_registered_user","User", "User", "id_user", "Registered_User","id_user", "Client","id_client",req.params.id_client];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "User" : rows});
          }
      });
  });

  router.get("/clients/:id_client/orders",function(req,res){
      var query = "SELECT * FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Order","Client","Client","id_client","Order","id_client","Client","id_client",req.params.id_client];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Orders" : rows});
          }
      });
  });

  router.get("/clients/:id_client/guests",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Guest","id_client",req.params.id_client];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Guests" : rows});
          }
      });
  });

  router.post("/clients",function(req,res){
      var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
      var table = ["User","name","surname","email","username","password","sex",req.body.name,req.body.surname,req.body.email,req.body.username,md5(req.body.password),req.body.sex];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding User)", "Error" : err});
          } else {
            var query = "INSERT INTO ??(??) VALUES (?)";
            var table = ["Client","id_user",row.insertId];
            query = mysql.format(query,table);
            connection.query(query,function(err,row){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding Client)", "Error" : err});
                } else {
                    res.json({"Error" : false, "Message" : "client Added !"});
                }
            });
          }
      });
  });

  router.delete("/clients/:id_client",function(req,res){
    var query_select = "SELECT id_user FROM ?? WHERE ??=?";
    var table = ["Client","id_client",req.params.id_client];
    query_select = mysql.format(query_select,table);
    connection.query(query_select,function(err,row){
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query_select"});
        } else {
          var id_user = row[0].id_user;
          var query_delete = "DELETE FROM ?? WHERE ??=?";
          var table = ["Client","id_client",req.params.id_client];
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
                        res.json({"Error" : false, "Message" : "Success, client with id_client = "+req.params.id_client+" deleted"});
                      }
                  });
              }
          });
        }
    });
});

  /*router.put("/clients",function(req,res){
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
        var table = ["Client","id_number",req.body.id_number,"ss",req.body.ss,"nationality",req.body.nationality,"salary",req.body.salary,"id_client",req.body.nationality];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the client with id_client = "+req.params.id_client});
            }
        });
    });*/


}
