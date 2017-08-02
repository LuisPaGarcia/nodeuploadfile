var express     = require('express');
var formidable  = require('formidable');
const path      = require('path');
const fs        = require('fs');
var app         = express();

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res){

    if (!fs.existsSync(`./uploads`))
        fs.mkdirSync(`./uploads`);

    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.sendFile(__dirname + '/index.html');
});

app.listen(3000,()=>{
    console.log('Listening on 3000 port');
});