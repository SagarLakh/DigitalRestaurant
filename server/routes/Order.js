var connection = require('../mySqlconnection');
module.exports = function (router,md5,mysql) {


  router.get("/orders",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["DishOrder"];
      query = mysql.format(query,table);
      connection(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Orders" : rows});
          }
      });
  });

  /*router.get("/orders/sit/:id_sit/client/:id_client",function(req,res){
      var query = "SELECT * FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??=? AND ?? = ?";
      var table = ["DishOrder","Dish","DishOrder","id_dish","Dish","id_dish","id_sit",req.params.id_sit, "id_client",req.params.id_client];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Order" : row});
          }
      });
  });*/

  router.get("/orders/sit/:id_sit/client/:id_client/topay",function(req,res){
      var query = "SELECT ??.*, ??.*, ??.name AS name_client, ??.name AS name_guest FROM ?? LEFT JOIN ?? ON ??.?? = ??.?? LEFT JOIN ?? ON ??.?? = ??.?? LEFT JOIN ?? ON ??.?? = ??.?? LEFT JOIN ?? ON ??.?? = ??.?? LEFT JOIN ?? ON ??.?? = ??.?? WHERE ??.??=? AND ??.?? = ? AND ??.?? = ?";
      var table = ["DishOrder","Dish","User","Guest","DishOrder","Dish","DishOrder","id_dish","Dish","id_dish",
      "Client","DishOrder","id_client","Client","id_client",
      "Registered_User","Client","id_registered_user","Registered_User","id_registered_user",
      "User","Registered_User","id_user", "User","id_user",
      "Guest","DishOrder","id_guest","Guest","id_guest",
      "DishOrder","id_sit",req.params.id_sit,"DishOrder", "id_client",req.params.id_client, "DishOrder","payed","false"];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Order" : row});
          }
      });
  });

  router.get("/orders/sit/:id_sit/client/:id_client",function(req,res){
      var query = "SELECT ??.*,??.*, ??.name AS name_client, ??.name AS name_guest FROM ?? LEFT JOIN ?? ON ??.?? = ??.?? LEFT JOIN ?? ON ??.?? = ??.?? LEFT JOIN ?? ON ??.?? = ??.?? LEFT JOIN ?? ON ??.?? = ??.?? LEFT JOIN ?? ON ??.?? = ??.?? WHERE ??.??=? AND ??.?? = ?";
      var table = ["DishOrder","Dish","User","Guest","DishOrder","Dish","DishOrder","id_dish","Dish","id_dish",
      "Client","DishOrder","id_client","Client","id_client",
      "Registered_User","Client","id_registered_user","Registered_User","id_registered_user",
      "User","Registered_User","id_user", "User","id_user",
      "Guest","DishOrder","id_guest","Guest","id_guest",
      "DishOrder","id_sit",req.params.id_sit,"DishOrder", "id_client",req.params.id_client];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Order" : row});
          }
      });
  });

  router.get("/orders/:id_order",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["DishOrder","id_order",req.params.id_order];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Order" : row});
          }
      });
  });

  router.post("/orders/active/station/table",function(req,res){
        
        var query = "SELECT * FROM ?? JOIN ?? ON ??.?? = ??.?? JOIN ?? ON ??.?? = ??.?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=? AND ??.?? = ? AND ??.?? = ? AND ??.?? = ? ORDER BY ??.??";
        var table = ["Sit","DishOrder","Sit","id_sit","DishOrder","id_sit","List_Stations","DishOrder","id_dish","List_Stations","id_dish","Dish","DishOrder","id_dish","Dish","id_dish","Sit", "id_table",req.body.id_table, "Sit","active", "true","List_Stations","id_station",req.body.id_station,"DishOrder","finished","false", "DishOrder", "sequence_order"];
        query = mysql.format(query,table);
        connection(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Orders" : row});
            }
        });
    });

   router.post("/orders",function(req,res){

      for (var i = 0; i < req.body.ListIdDishes.length; i++) {
        
        var query = "INSERT INTO ??(??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
        var table = ["DishOrder","id_sit","id_dish", "id_client", "id_guest", "state", "sequence_order","comment", req.body.id_sit, req.body.ListIdDishes[i].id_dish, req.body.id_client, req.body.id_guest,"Waiting",req.body.ListIdDishes[i].sequence, req.body.ListIdDishes[i].comment];
        query = mysql.format(query,table);
        connection(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } 
        });
        
      };
      res.json({"Error" : false, "Message" : "Order Added !"});
      
  });

router.put("/orders/status",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
      var table = ["DishOrder","state",req.body.status, "id_order", req.body.id_order];
      query = mysql.format(query,table);
      console.log(query);
      connection(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the status", "Restaurant" : row});
            }
        });
    });

router.put("/orders/finish",function(req,res){
  for (var i = 0; i < req.body.listIds.length; i++) {
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
      var table = ["DishOrder","finished",req.body.setter, "id_order", req.body.listIds[i]];
      query = mysql.format(query,table);
      console.log(query);
      connection(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            }
        });
    };
    res.json({"Error" : false, "Message" : "Updated the finished"});
  });




 router.put("/orders/pay",function(req,res){
    for (var i = 0; i < req.body.ListIdOrders.length; i++) {
      var orders = [];
      var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
      var table = ["DishOrder","payed","true", "id_order", req.body.ListIdOrders[i]];
      console.log(req.body.ListIdOrders[i]);
      query = mysql.format(query,table);
      console.log(query);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          }
          else orders.push(row);
      });
      
    };
    res.json({"Error" : false, "Message" : "Orders Payed!"});
      
  });

 router.delete("/orders/:id_order",function(req,res){
      var query_select = "DELETE FROM ?? WHERE ??=?";
      var table = ["DishOrder","id_order",req.params.id_order];
      query_select = mysql.format(query_select,table);
      connection(query_select,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query select restaurant"});
          }
          else {
              res.json({"Error" : false, "Message" : "Success, order with id_menu = "+req.params.id_order+" deleted"});
          }
      });
  });

}
