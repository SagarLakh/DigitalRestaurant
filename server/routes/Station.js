module.exports = function (router,connection,md5,mysql) {


  router.get("/stations",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Station"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Station" : rows});
          }
      });
  });

  router.get("/stations/:id_station",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Station","id_station",req.params.id_range];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Station" : row});
          }
      });
  });

  router.get("/stations/restaurant/:id_restaurant",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Station","id_restaurant",req.params.id_restaurant];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Stations" : row});
          }
      });
  });

  router.get("/stations/:id_station/dishes",function(req,res){
      var query = "SELECT * FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??=?";
      var table = ["List_Stations","Dish","List_Stations", "id_dish", "Dish", "id_dish", "id_station",req.params.id_station];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Dishes" : row});
          }
      });
  });

  router.delete("/stations/:id_station",function(req,res){
      var query = "DELETE FROM ?? WHERE ??=?";
      var table = ["Station","id_station",req.params.id_station];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Station" : row});
          }
      });
  });

  router.put("/stations",function(req,res){
      var query = "UPDATE ?? SET ?? = ? WHERE ??=?";
      var table = ["Station","name",req.body.name, "id_station",req.body.id_station];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Station" : row});
          }
      });
  });

    
}
