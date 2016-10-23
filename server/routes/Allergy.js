module.exports = function (router,connection,md5,mysql) {


  router.get("/allergies",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Allergy"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Allergies" : rows});
          }
      });
  });

  router.get("/allergies/dish/:id_dish",function(req,res){
      var query = "SELECT * FROM ?? WHERE ?? = ?";
      var table = ["List_Allergies", "id_dish", req.params.id_dish];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Allergies" : rows});
          }
      });
  });


}
