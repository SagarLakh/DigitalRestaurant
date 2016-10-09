module.exports = function (router,connection,md5,mysql) {


  router.get("/orders",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["DishOrder"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Orders" : rows});
          }
      });
  });

  router.get("/orders/:id_order",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["DishOrder","id_order",req.params.id_order];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Order" : row});
          }
      });
  });

   router.post("/orders",function(req,res){

      for (var i = 0; i < req.body.ListIdDishes.length; i++) {
        
        var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
        var table = ["DishOrder","id_sit","id_dish", "id_client", "id_guest", "state", "sequence", req.body.id_sit, req.body.ListIdDishes[i].id_dish, req.body.id_client, req.body.id_guest,"Waiting",req.body.sequence];
        query = mysql.format(query,table);
        connection.query(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } 
        });
        
      };
      res.json({"Error" : false, "Message" : "Order Added !"});
      
  });

 router.put("/orders/pay",function(req,res){
    


    for (var i = 0; i < req.body.ListIdOrders.length; i++) {
      var orders = [];
      var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
      var table = ["DishOrder","state","Payed", "id_order", req.body.ListIdOrders[i].id_order];
      console.log(req.body.ListIdOrders[i].id_order);
      query = mysql.format(query,table);
      console.log(query);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          }
          else orders.push(row);
      });
      
    };
    res.json({"Error" : false, "Message" : "Orders Payed!"});
      
  });

}
