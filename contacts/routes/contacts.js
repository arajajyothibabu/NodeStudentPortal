var express = require('express');
var router = express.Router();
var contacts = [];
var fs = require('fs');

//get bugs
router.get('/bugs', function(req, res, next) {
        var obj = JSON.parse(fs.readFileSync("bugs.json", 'utf8'));
        res.json(obj);
});

/* GET contacts */
router.get('/:id', function(req, res, next) {
    if(contacts[parseInt(req.params.id)] != null)
    {
        var obj = JSON.parse(fs.readFileSync("data\\"+req.params.id+"-Contact.json", 'utf8'));
        //res.json(contacts[parseInt(req.params.id)]); //for Cache
        //console.log(JSON.stringify(obj));
        res.json(obj); //for filePersistence
    }
    else res.json("No Contact Found");
});

//get details of student
router.get('/www/:id', function(req, res, next) {
    if(req.params.id != null)
    {
        var obj = JSON.parse(fs.readFileSync("data\\"+req.params.id+"-Details.json", 'utf8'));
        //res.json(contacts[parseInt(req.params.id)]); //for Cache
        //console.log(JSON.stringify(obj));
        if(obj != null)
            res.json(obj); //for filePersistence
        else res.send("No Contact Found");
    }
    else res.json("No Contact Found");
});

/* Get Messages */
router.get('/:id/messages', function(req, res, next) {
    var obj = JSON.parse(fs.readFileSync("data\\"+req.params.id+"-Contact.json", 'utf8'));
       // if(contacts[parseInt(req.params.id)]!= null && contacts[parseInt(req.params.id)].msg != null)
            //res.json(contacts[parseInt(req.params.id)].msg);
    if(obj != null)
        res.json(obj.msg);
    else res.json("No Messages Found");
});


router.get('/:id/messages/:msgid', function(req, res, next) {
    var obj = JSON.parse(fs.readFileSync("data\\"+req.params.id+"-Contact.json", 'utf8'));
    if(obj != null)
        res.json(obj.msg[parseInt(req.params.msgid)]);
    //if(contacts[parseInt(req.params.id)]!= null && contacts[parseInt(req.params.id)].msg[parseInt(req.params.msgid)] != null)
   // res.json(contacts[parseInt(req.params.id)].msg[parseInt(req.params.msgid)]);
    else res.json("No message Found");
});

router.post('/', function(req, res, next) {
    contacts.push(req.body);
    contacts[contacts.length-1].msg = [];
    fs.writeFileSync("data\\"+(contacts.length-1)+"-Contact.json",JSON.stringify(contacts[contacts.length-1]));
    res.json(""+(contacts.length-1));
});

/*router.post('/:id', function(req, res, next) {
    var obj = JSON.parse(fs.readFileSync("data\\"+req.params.id+"-Contact.json", 'utf8'));
    contacts[parseInt(req.params.id)].msg.push(req.body);
    obj.msg.push(req.body);
    fs.writeFileSync("data\\"+req.params.id+"-Contact.json",JSON.stringify(obj));
    //res.json(""+(contacts[parseInt(req.params.id)].msg.length-1));
    res.json(""+(obj.msg.length-1));
});*/

//post method for details from web page

router.post('/www',function(req, res, next){
    //contacts.push(req.body);
    //contacts[contacts.length-1].marks = [];
    fs.writeFileSync("data\\"+req.body.id+"-Details.json",JSON.stringify(req.body));
    //router.get("http://localhost:3000/contacts/www/"+req.body.id,);
    /*res.writeHead(301,
      {Location: 'http://localhost:3000/home.html'}
    );
    res.end();*/
    res.json(req.body.id);
});

router.put('/:id', function(req, res, next) {
    var obj = JSON.parse(fs.readFileSync("data\\"+req.params.id+"-Contact.json", 'utf8'));
    
    if(req.body.firstName != null)
        obj.firstName = contacts[parseInt(req.params.id)].firstName = req.body.firstName;
    if(req.body.lastName != null)
        obj.lastName = contacts[parseInt(req.params.id)].laststName = req.body.lastName;
    if(req.body.phone != null)
        obj.phone = contacts[parseInt(req.params.id)].phone = req.body.phone;
    fs.writeFileSync("data\\"+req.params.id+"-Contact.json",JSON.stringify(obj));
    //res.json(contacts[parseInt(req.params.id)]);
    var updatedObj = JSON.parse(fs.readFileSync("data\\"+req.params.id+"-Contact.json", 'utf8'));
    res.json(updatedObj);
});

module.exports = router;