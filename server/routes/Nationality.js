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

  router.get("/nationalities",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Nationality"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
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
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Nationality" : row});
          }
      });
  });

  router.post("/nationalities",function(req,res){
      var query = "INSERT INTO ??(??) VALUES (?)";
      var table = ["Nationality","country_name",req.body.country_name];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding User)", "Error" : err});
          } else {
            console.log(row);
            res.json({"Error" : false, "Message" : "Nationality Added !"});
          }
      });
  });

  router.delete("/Nationalities/:id_nationality",function(req,res){
      var query_select = "SELECT id_nationality FROM ?? WHERE ??=?";
      var table = ["nationality","id_nationality",req.params.id_nationality];
      query_select = mysql.format(query_select,table);
      connection.query(query_select,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query select nationality"});
          }
          else {
              res.json({"Error" : false, "Message" : "Success, nationality with id_nationality = "+req.params.id_nationality+" deleted"});
          }
      });
  });

  router.put("/Nationalities",function(req,res){
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
        var table = ["nationality","name",req.body.name,"email",req.body.email,"phone1",req.body.phone1,"phone2",req.body.phone2,"addredd",req.body.address,"id_nationality",req.body.id_nationality];
        query = mysql.format(query,table);
        connection.query(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the nationality with id_nationality = "+req.body.id_nationality});
            }
        });
    });


}
