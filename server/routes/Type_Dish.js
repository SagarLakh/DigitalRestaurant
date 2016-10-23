module.exports = function (router,connection,md5,mysql) {


  router.get("/typedishes",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Type_Dish"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Type_Dish" : rows});
          }
      });
  });

  router.get("/typedishes/:id_type_dish",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Type_Dish","id_type_dish",req.params.id_type_dish];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Type_Dish" : row});
          }
      });
  });

  router.get("/typedishes/restaurant/:id_restaurant",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Type_Dish","id_restaurant",req.params.id_restaurant];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Type_Dish" : row});
          }
      });
  });

  router.post("/typedishes",function(req,res){
      var query = "INSERT INTO ?? (??,??) VALUES (?, ?)";
      var table = ["Type_Dish","name","id_restaurant",req.body.name, req.body.id_restaurant];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Type_Dish" : row});
          }
      });
  });
}
