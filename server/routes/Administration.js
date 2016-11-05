module.exports = function (router,connection,md5,mysql) {

  function ISODateString(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
        + pad(d.getUTCMonth()+1)+'-'
        + pad(d.getUTCDate()) +' '
        + pad(d.getUTCHours())+':'
        + pad(d.getUTCMinutes())+':'
        + pad(d.getUTCSeconds())
  }

  router.get("/administrations",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Administration"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Administrations" : rows});
          }
      });
  });

  router.get("/administrations/admin/:id_admin",function(req,res){
      var query = "SELECT id_restaurant FROM ?? WHERE ??=?";
      var table = ["Administration","id_admin",req.params.id_admin];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "ListRestaurants" : row});
          }
      });
  });

  router.get("/administrations/restaurant/:id_restaurant",function(req,res){
      var query = "SELECT id_admin FROM ?? WHERE ??=?";
      var table = ["Administration","id_restaurant",req.params.id_restaurant];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Admin" : row});
          }
      });
  });

  router.post("/administrations",function(req,res){
      var query = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
      var table = ["Administration","id_admin","id_restaurant",req.body.id_admin, req.body.id_restaurant];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Administration" : row});
          }
      });
  });
}
