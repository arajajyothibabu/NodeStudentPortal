var express = require('express');
var app = express();
app.get('/',function(request,response){
    response.send("<html><head><title>Intro to Node.Js</title></head><body><h1 align='center'>Hello JB</h1></body></html>");
});

var server = app.listen(1337, '127.0.0.1',function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
//console.log('Server running at http://127.0.0.1:1337/');
//commands
//++++++++++++++++++++++++
//>>>project login
//>>>enter username nikhil_v
//welocome
//>>>projcet init
//>>>project status
//>>>project test
//>>>project submit
//>>>

//to create git
//git init
//git remote add origin <git-url>
//git add
//git commit -m (commit message)
//git push -o (origin master)