module.exports = function (router,connection,md5,mysql) {


  router.get("/ranges",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Range"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
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
      connection.query(query,function(err,row){
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
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Ranges" : row});
          }
      });
  });

    router.post("/ranges",function(req,res){
      var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
      var table = ["Range","id_restaurant","nmin","nmax","name",req.body.id_restaurant, req.body.nmin, req.body.nmax, req.body.name];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding Ranges)", "Error" : err});
          } else {
            console.log(row);
            
            var max = req.body.nmax;
            for (var i = req.body.nmin; i <= max; ++i){
              var query = "INSERT INTO ??(??,??) VALUES (?,?)";
              var table = ["Table","id_range","id_table_restaurant",row.insertId, i];
              query = mysql.format(query,table);
              connection.query(query,function(err,row){
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
