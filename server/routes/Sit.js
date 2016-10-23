module.exports = function (router,connection,md5,mysql) {


  router.get("/sits",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Sit"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Sits" : rows});
          }
      });
  });

  router.get("/sits/:id_sit",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Sit","id_sit",req.params.id_guest];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Sit" : row});
          }
      });
  });

  router.get("/sits/restaurant/:id_restaurant/active",function(req,res){
      var query = "SELECT DISTINCT Sit.id_table, Table.id_table_restaurant FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??=? AND ?? = ?";
      var table = ["Sit","Table","Sit","id_table","Table","id_table","id_restaurant",req.params.id_restaurant, "active", "true"];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Sits" : row});
          }
      });
  });

  router.put("/sits/:id_sit/finish",function(req,res){
      var query = "UPDATE ?? SET ?? = ? WHERE ??=?";
      var table = ["Sit","active", "false","id_sit",req.params.id_sit];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Sits" : row});
          }
      });
  });

   /*router.get("/sits/client/:id_client",function(req,res){
      var query = "SELECT ??.* FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Guest", "Guest", "Client", "Client", "id_client", "Guest", "id_client", "Guest", "id_client",req.params.id_client];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Guests" : row});
          }
      });
  });*/

   router.post("/sits",function(req,res){
      var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
      var table = ["Sit","id_client","id_table","id_restaurant", req.body.id_client,req.body.id_table,req.body.id_restaurant];
      console.log(query);
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Sit Added !", "id_sit" : row.insertId});
          }
      });
  });

}
