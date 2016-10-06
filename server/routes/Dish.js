module.exports = function (router,connection,md5,mysql) {


  router.get("/dishes",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Dish"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Dishes" : rows});
          }
      });
  });

  router.get("/dishes/:id_dish",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Dish","id_dish",req.params.id_dish];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Dish" : row});
          }
      });
  });

  router.get("/dishes/restaurant/:id_restaurant",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Dish","id_restaurant",req.params.id_restaurant];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Dishes" : row});
          }
      });
  });

  router.get("/dishes/type_dish/:id_type_dish",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Dish","id_type_dish",req.params.id_type_dish];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Dishes" : row});
          }
      });
  });

  router.delete("/dishes/:id_dish",function(req,res){
      var query_select = "DELETE FROM ?? WHERE ??=?";
      var table = ["Dish","id_dish",req.params.id_dish];
      query_select = mysql.format(query_select,table);
      connection.query(query_select,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query select restaurant"});
          }
          else {
              res.json({"Error" : false, "Message" : "Success, dish with id_dish = "+req.params.id_dish+" deleted"});
          }
      });
  });

}
