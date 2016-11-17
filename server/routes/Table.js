var connection = require('../mySqlconnection');
module.exports = function (router,md5,mysql) {


  router.get("/tables",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Table"];
      query = mysql.format(query,table);
      connection(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Tables" : rows});
          }
      });
  });

  router.get("/tables/:id_table",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Table","id_table",req.params.id_range];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Table" : row});
          }
      });
  });

   router.get("/tables/nfc/:nfc_tag",function(req,res){
      var query = "SELECT Table.id_table, Table.id_table_restaurant, Range.id_restaurant FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??=?";
      var table = ["Table", "Range", "Range", "id_range", "Table", "id_range", "nfc_tag",req.params.nfc_tag];
      query = mysql.format(query,table);
      connection(query,function(err,row){
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
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Tables" : row});
          }
      });
  });
}
