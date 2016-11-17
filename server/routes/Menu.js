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

  router.get("/menus",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Menu"];
      query = mysql.format(query,table);
      connection(query,function(err,rows){
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
      connection(query,function(err,row){
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
      connection(query_select,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query select restaurant"});
          }
          else {
              res.json({"Error" : false, "Message" : "Success, menu with id_menu = "+req.params.id_menu+" deleted"});
          }
      });
  });

  router.put("/menus/listdays",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["Menu","listDays",req.body.newdays,"id_menu",req.body.menu.id_menu];
        query = mysql.format(query,table);
        connection(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated correctly"});
            }
        });
    });

  router.put("/menus",function(req,res){
        console.log(req.body);
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
        var table = ["Menu","listDays",req.body.listDays,"name",req.body.name,"price",req.body.price, "moment_day", req.body.moment_day, "id_menu",req.body.id_menu];
        query = mysql.format(query,table);
        connection(query,function(err,row){
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
        connection(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {

                if (row[0].active == 'true') var change = 'false';
                else var change = 'true';
                var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                var table = ["Menu","active", change, "id_menu",req.params.id_menu];
                query = mysql.format(query,table);
                connection(query,function(err,row){
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
