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

  router.get("/menus",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Menu"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Menus" : rows});
          }
      });
  });

  router.get("/menus/:id_menu",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["Menu","id_menu",req.params.id_menu];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Menus" : row});
          }
      });
  });

  

  router.delete("/menus/:id_menu",function(req,res){
      var query_select = "DELETE FROM ?? WHERE ??=?";
      var table = ["Menu","id_menu",req.params.id_menu];
      query_select = mysql.format(query_select,table);
      connection.query(query_select,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query select restaurant"});
          }
          else {
              res.json({"Error" : false, "Message" : "Success, menu with id_menu = "+req.params.id_menu+" deleted"});
          }
      });
  });

  router.put("/menus/listdays/:id_menu",function(req,res){
        var new_list_days = req.body.listdays;
        console.log(new_list_days[req.body.index_day]);
        if (new_list_days[req.body.index_day] == 0) {
            new_list_days[req.body.index_day] = 1;
            console.log("entro");
            console.log(new_list_days[req.body.index_day]);
        }
        else new_list_days[req.body.index_day] = 1;
        console.log(new_list_days);
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["Menu","listDays",new_list_days,"id_menu",req.params.id_menu];
        query = mysql.format(query,table);
        connection.query(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the ListDays for menu with id_menu = "+req.params.id_menu});
            }
        });
    });

  router.put("/menus/:id_menu/active",function(req,res){
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var table = ["Menu","id_menu",req.params.id_menu];
        query = mysql.format(query,table);
        connection.query(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {

                if (row[0].active == 'true') var change = 'false';
                else var change = 'true';
                console.log(row[0].active);
                console.log("BOOLEAN");
                console.log(change);
                var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                var table = ["Menu","active", change, "id_menu",req.params.id_menu];
                query = mysql.format(query,table);
                connection.query(query,function(err,row){
                    if(err) {
                        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                    } else {
                        res.json({"Error" : false, "Message" : "Updated the active for menu with id_menu = "+req.params.id_menu});
                    }
                });
            }
        });
    });


}