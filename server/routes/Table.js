module.exports = function (router,connection,md5,mysql) {


  router.get("/tables",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Tables"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Tables" : rows});
          }
      });
  });

  router.get("/table/:id_table",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Table","id_table",req.params.id_range];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Table" : row});
          }
      });
  });

  router.get("/tables/restaurant/:id_restaurant",function(req,res){
      var query = "SELECT * FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Table","Range","Range","id_range","Table","id_range","Range","id_restaurant",req.params.id_restaurant];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Tables" : row});
          }
      });
  });
}
