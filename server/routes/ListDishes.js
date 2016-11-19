var connection = require('../mySqlconnection');
module.exports = function (router,md5,mysql) {


  router.get("/listdishes",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["List_Dishes"];
      query = mysql.format(query,table);
      connection(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Dishes" : rows});
          }
      });
  });


  router.get("/listdishes/menu/:id_menu",function(req,res){
      var query = "SELECT ??.* FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Dish","Dish","List_Dishes","List_Dishes","id_dish","Dish","id_dish","List_Dishes","id_menu",req.params.id_menu];
      query = mysql.format(query,table);
      console.log(query);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Dishes" : row});
          }
      });
  });


  router.delete("/listdishes/:id_list_dishes",function(req,res){
      var query_select = "DELETE FROM ?? WHERE ??=?";
      var table = ["List_Dishes","id_list_dishes",req.params.id_list_dishes];
      query_select = mysql.format(query_select,table);
      connection(query_select,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query select restaurant"});
          }
          else {
              res.json({"Error" : false, "Message" : "Success, list dish with id_list_dishes = "+req.params.id_list_dishes+" deleted"});
          }
      });
  });

  router.post("/listdishes",function(req,res){
      var query = "INSERT INTO ?? (??, ??) VALUES (?,?)";
      var table = ["List_Dishes","id_menu","id_dish",req.body.id_menu,req.body.id_dish];
      query = mysql.format(query,table);
      console.log(query);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query", "Success" : false});
          } else {
              res.json({"Error" : false, "Message" : "ListDish Added correctly", "Success" : true, "List_Dish" : row});
          }
      });
  });

}
