var connection = require('../mySqlconnection');
module.exports = function (router,md5,mysql) {

  function ISODateString(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
        + pad(d.getUTCMonth()+1)+'-'
        + pad(d.getUTCDate()) +' '
        + pad(d.getUTCHours())+':'
        + pad(d.getUTCMinutes())+':'
        + pad(d.getUTCSeconds())
  }

  router.get("/nationalities",function(req,res){
      var query = "SELECT * FROM ?? ORDER BY ??";
      var table = ["Nationality","country_name"];
      query = mysql.format(query,table);
      connection(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Nationalities" : rows});
          }
      });
  });

  router.get("/nationalities/:id_nationality",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Nationality","id_nationality",req.params.id_nationality];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Nationality" : row});
          }
      });
  });

  router.delete("/Nationalities/:id_nationality",function(req,res){
      var query_select = "SELECT id_nationality FROM ?? WHERE ??=?";
      var table = ["nationality","id_nationality",req.params.id_nationality];
      query_select = mysql.format(query_select,table);
      connection(query_select,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query select nationality"});
          }
          else {
              res.json({"Error" : false, "Message" : "Success, nationality with id_nationality = "+req.params.id_nationality+" deleted"});
          }
      });
  });



}
