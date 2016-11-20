var connection = require('../mySqlconnection');
module.exports = function (router,md5,mysql) {


  router.get("/liststations",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["List_Stations"];
      query = mysql.format(query,table);
      connection(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Dishes" : rows});
          }
      });
  });




  router.delete("/liststations/:id_list_stations",function(req,res){
      var query_select = "DELETE FROM ?? WHERE ??=?";
      var table = ["List_Stations","id_list_stations",req.params.id_list_stations];
      query_select = mysql.format(query_select,table);
      connection(query_select,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query select restaurant"});
          }
          else {
              res.json({"Error" : false, "Message" : "Success, list dish with id_list_stations = "+req.params.id_list_stations+" deleted"});
          }
      });
  });

  router.post("/liststations",function(req,res){
      var query = "INSERT INTO ?? (??, ??) VALUES (?,?)";
      var table = ["List_Stations","id_station","id_dish",req.body.id_station,req.body.id_dish];
      query = mysql.format(query,table);
      console.log(query);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query", "Success" : false});
          } else {
              res.json({"Error" : false, "Message" : "ListStation Added correctly", "Success" : true, "List_Station" : row});
          }
      });
  });

}
