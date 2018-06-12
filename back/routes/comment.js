var express = require('express');
var router = express.Router();

var database = require('../services/database');

router.get('/', function(req, res, next) {
    res.render('index');
});


router.post('/', function(req, res, next) {
    database.sendQuery(`INSERT INTO comments (text, id_recipe) VALUES ('${req.body.data.text}', ${req.body.data.id_recipe})`, function (err, results) {
        if (err) {
        } else {
            res.json(results.insertId)
        }
    })
});

module.exports = router;