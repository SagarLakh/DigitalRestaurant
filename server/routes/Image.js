module.exports = function (router,connection,md5,mysql) {


  router.get("/images",function(req,res){
      var query = "SELECT * FROM ??";
      var table = ["Image"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Images" : rows});
          }
      });
  });




router.get("/images/:id_image",function(req,res){
      var query = "SELECT * FROM ?? WHERE ?? = ?";
      var table = ["Image", "id_image", req.params.id_image];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Image" : rows});
          }
      });
  });




router.get("/images/imgpath/:img_path",function(req,res){
      var query = "SELECT * FROM ?? WHERE ?? = ?";
      var table = ["Image", "img_path", req.params.img_path];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Image" : rows});
          }
      });
  });




router.put("/images",function(req,res){
      var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
      var table = ["Image", "content", req.params.content, "img_path", req.params.img_path];
      query = mysql.format(query,table);
      connection.query(query,function(err,row){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Image" : row});
          }
      });
  });


}


