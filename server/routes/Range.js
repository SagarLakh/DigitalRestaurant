var connection = require('../mySqlconnection');
module.exports = function (router,md5,mysql) {

  function generateToken32()
  {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 32; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
  }

  router.get("/ranges",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Range"];
      query = mysql.format(query,table);
      connection(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Ranges" : rows});
          }
      });
  });

  router.get("/ranges/:id_range",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Range","id_range",req.params.id_range];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Range" : row});
          }
      });
  });

  router.get("/ranges/restaurant/:id_restaurant",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Range","id_restaurant",req.params.id_restaurant];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Ranges" : row});
          }
      });
  });

  router.delete("/ranges/:id_range",function(req,res){
      var query = "DELETE FROM ?? WHERE ??=?";
      var table = ["Range","id_range",req.params.id_range];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Range" : row});
          }
      });
  });

    router.post("/ranges",function(req,res){
      var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
      var table = ["Range","id_restaurant","nmin","nmax","name",req.body.id_restaurant, req.body.nmin, req.body.nmax, req.body.name];
      query = mysql.format(query,table);
      connection(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding Ranges)", "Error" : err});
          } else {
            console.log(row);
            
            var max = req.body.nmax;
            for (var i = req.body.nmin; i <= max; ++i){
              var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
              var table = ["Table","id_range","id_table_restaurant","nfc_tag","qr_code",row.insertId, i, generateToken32(),generateToken32()];
              query = mysql.format(query,table);
              connection(query,function(err,row){
                  if(err) {
                      res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding Tables)", "Error" : err});
                  }
              });

            }
            res.json({"Error" : false, "Message" : "Range and Tables Added !"});
          }
      });
  });
}
