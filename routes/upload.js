var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');

router.post('/', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({ fields: fields, files: files }));
    });

    form.on('end', function(fields, files) {
        var tempPath = this.openedFiles[0].path;
        var filename = this.openedFiles[0].name;
        var newLocation = 'uploads/';

        fs.copy(tempPath, newLocation + filename, function(err) {
            if(err) {
                console.error(err);
            } else {
                console.log('success');
            }
        });
    });
});

module.exports = router;