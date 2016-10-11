module.exports = function (router,connection,md5,mysql) {


  router.get("/guests",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Guests"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Guests" : rows});
          }
      });
  });

  router.get("/guests/:id_guest",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Guest","id_guest",req.params.id_guest];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Guest" : row});
          }
      });
  });

   router.get("/guests/client/:id_client",function(req,res){
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
  });

   router.post("/guests",function(req,res){
      var query = "INSERT INTO ??(??,??) VALUES (?,?)";
      var table = ["Guest","id_client","id_guest",req.body.id_client,req.body.name];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Guest Added !", "id_guest" : row.insertId});
          }
      });
  });

}
