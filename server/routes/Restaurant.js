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

  router.get("/restaurants",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Restaurant"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Restaurants" : rows});
          }
      });
  });

  router.get("/restaurants/:id_restaurant",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Restaurant","id_restaurant",req.params.id_restaurant];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Restaurant" : row});
          }
      });
  });

  router.get("/restaurants/:id_restaurant/waiters",function(req,res){
      var query = "SELECT ??.* FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Waiter","Waiter","Restaurant","Restaurant","id_restaurant","Waiter","id_restaurant","Restaurant","id_restaurant",req.params.id_restaurant];
      query = mysql.format(query,table);
      console.log(query);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Waiters" : row});
          }
      });
  });

  router.get("/restaurants/:id_restaurant/chefs",function(req,res){
      var query = "SELECT ??.* FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Chef","Chef","Restaurant","Restaurant","id_restaurant","Chef","id_restaurant","Restaurant","id_restaurant",req.params.id_restaurant];
      query = mysql.format(query,table);
      console.log(query);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Chefs" : row});
          }
      });
  });


  router.get("/restaurants/:id_restaurant/admins",function(req,res){
      var query = "SELECT ??.* FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Admin","Admin","Administration","Administration","id_admin","Admin","id_admin","Administration","id_restaurant",req.params.id_restaurant];
      query = mysql.format(query,table);
      console.log(query);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Admins" : row});
          }
      });
  });

  router.get("/restaurants/:id_restaurant/tables",function(req,res){
      var query = "SELECT ??.* FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Table","Table","Restaurant","Restaurant","id_restaurant","Table","id_restaurant","Restaurant","id_restaurant",req.params.id_restaurant];
      query = mysql.format(query,table);
      console.log(query);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Tables" : row});
          }
      });
  });

  router.get("/restaurants/:id_restaurant/menus",function(req,res){
      var query = "SELECT ??.* FROM ?? JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?";
      var table = ["Menu","Menu","Restaurant","Restaurant","id_restaurant","Menu","id_restaurant","Restaurant","id_restaurant",req.params.id_restaurant];
      query = mysql.format(query,table);
      console.log(query);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Menus" : row});
          }
      });
  });





  router.post("/restaurants",function(req,res){
      var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
      var table = ["Restaurant","name","email","phone1","phone2","address",req.body.name,req.body.email,req.body.phone1,req.body.phone2,req.body.address];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query (Adding User)", "Error" : err});
          } else {
            console.log(row);
            res.json({"Error" : false, "Message" : "Restaurant Added !"});
          }
      });
  });

  router.delete("/restaurants/:id_restaurant",function(req,res){
      var query_select = "SELECT id_restaurant FROM ?? WHERE ??=?";
      var table = ["Restaurant","id_restaurant",req.params.id_restaurant];
      query_select = mysql.format(query_select,table);
      connection.query(query_select,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query select restaurant"});
          }
          else {
              res.json({"Error" : false, "Message" : "Success, restaurant with id_restaurant = "+req.params.id_restaurant+" deleted"});
          }
      });
  });

  router.put("/restaurants",function(req,res){
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
        var table = ["Restaurant","name",req.body.name,"email",req.body.email,"phone1",req.body.phone1,"phone2",req.body.phone2,"addredd",req.body.address,"id_restaurant",req.body.id_restaurant];
        query = mysql.format(query,table);
        connection.query(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the restaurant with id_restaurant = "+req.body.id_restaurant});
            }
        });
    });


}
