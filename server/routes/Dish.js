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

  /*router.get("/dishes/:id_dish/info",function(req,res){
      var query = "SELECT * FROM ?? LEFT JOIN ?? ON ??.?? = ??.?? LEFT JOIN ?? ON ??.?? = ??.?? LEFT JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Dish", "List_Allergies","Dish","id_dish","List_Allergies","id_dish","Allergy","List_Allergies","id_allergy","Allergy","id_allergy","Type_Dish","Dish","id_type_dish","Type_Dish","id_type_dish", "Dish","id_dish",req.params.id_dish];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Dish" : row});
          }
      });
  });*/

 router.get("/dishes/:id_dish/info",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Dish","id_dish",req.params.id_dish];
      var result;
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {

              result = row;
              console.log(result);
              var query = "SELECT name FROM ?? WHERE ??=?";
              var table = ["Type_Dish","id_type_dish",result[0].id_type_dish];
              query = mysql.format(query,table);
              connection.query(query,function(err,row){
                  if(err) {
                      res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                  } else {

                      result.name_type = row[0];
                      res.json({"Error" : false, "Message" : "Success", "Dish" : result});
                  }
              });
              
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

  router.get("/dishes/restaurant/:id_restaurant/typedish",function(req,res){
      var query = "SELECT Dish.*, Type_Dish.name AS name_type FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=? ORDER BY ??.??";
      var table = ["Dish","Type_Dish","Dish","id_type_dish","Type_Dish","id_type_dish", "Dish","id_restaurant",req.params.id_restaurant, "Dish","id_type_dish"];
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

  router.post("/dishes",function(req,res){
      var query = "INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?,?,?,?,?,?,?,?,?)";
      var table = ["Dish","name","description","price","tax","id_restaurant","id_type_dish","sequence","img_path","active",
      req.body.name,req.body.description,req.body.price,req.body.tax,req.body.id_restaurant,req.body.id_type_dish,req.body.sequence,req.body.img_path,req.body.active,];
      query = mysql.format(query,table);
      console.log(query);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query", "Success" : false});
          } else {
              res.json({"Error" : false, "Message" : "Dish Added correctly", "Success" : true, "Dish" : row});
          }
      });
  });

  router.put("/dishes",function(req,res){
      var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
      var table = ["Dish","name",req.body.name,"description",req.body.description,"price",req.body.price,"tax",req.body.tax,
      "id_restaurant",req.body.id_restaurant,"id_type_dish",req.body.id_type_dish,"sequence",req.body.sequence,"img_path",
      req.body.img_path,"active",req.body.active,"id_dish", req.body.id_dish];
      query = mysql.format(query,table);
      console.log(query);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query", "Success" : false});
          } else {
              res.json({"Error" : false, "Message" : "Dish Updated correctly", "Success" : true, "Dish" : row});
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

  router.put("/dishes/:id_dish/active",function(req,res){
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var table = ["Dish","id_dish",req.params.id_dish];
        query = mysql.format(query,table);
        connection.query(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {

                if (row[0].active == 'true') var change = 'false';
                else var change = 'true';
                var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                var table = ["Dish","active", change, "id_dish",req.params.id_dish];
                query = mysql.format(query,table);
                connection.query(query,function(err,row){
                    if(err) {
                        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                    } else {
                        res.json({"Error" : false, "Message" : "Updated the active for dish with id_dish = "+req.params.id_dish});
                    }
                });
            }
        });
    });


}
