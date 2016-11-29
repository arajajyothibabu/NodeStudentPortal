var express = require('express');
var router = express.Router();
var contacts = [];
var fs = require('fs');
/* GET contacts */
router.get('/', function(req, res, next) {
    if(contacts[parseInt(req.params.id)] != null)
    {
        var obj = JSON.parse(fs.readFileSync("data\\bugs.json", 'utf8'));
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

module.exports = router;