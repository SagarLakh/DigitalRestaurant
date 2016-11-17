var connection = require('../mySqlconnection');
module.exports = function (router,md5,mysql) {


  router.get("/listallergies",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["List_Allergies"];
      query = mysql.format(query,table);
      connection(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "List_Allergies" : rows});
          }
      });
  });

  router.post("/listallergies",function(req,res){
      var query = "INSERT INTO ?? (??, ??) VALUES (?,?)";
      var table = ["List_Allergies","id_dish","id_allergy",req.body.id_dish, req.body.id_allergy];
      query = mysql.format(query,table);
      connection(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "List_Allergies" : rows});
          }
      });
  });


}
