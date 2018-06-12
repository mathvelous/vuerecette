var express = require('express');
var router = express.Router();

var database = require('../services/database');

router.get('/', function(req, res, next) {
    database.sendQuery('SELECT * FROM recipe', function (err, results) {
        if (err) {

        } else {
            res.json(results)
        }
    })
});

router.post('/add', function(req, res, next) {
    console.log(req.body.data.name)
    console.log(req.body.ingredients)
    database.sendQuery(`INSERT INTO recipe (name, time, difficulty, price) VALUES ('${req.body.data.name}', ${req.body.data.time}, '${req.body.data.difficulty}', '${req.body.data.price}')`, function (err, results) {
        if (err) {
        } else {
            for(let i = 0; i<req.body.ingredients.length; i++){
                let ingredient = req.body.ingredients[i]
                database.sendQuery(`INSERT INTO ingredients (name, id_recipe, quantity) VALUES ('${ingredient.name}', ${results.insertId}, '${ingredient.quantity}')`, function (err, results) {
                    if (err) {
                    }
                })
            }
            for(let i = 0; i<req.body.steps.length; i++){
                let step = req.body.steps[i]
                database.sendQuery(`INSERT INTO steps (id_recipe, text) VALUES (${results.insertId}, '${step.text}')`, function (err, results) {
                    if (err) {
                    }
                })
            }
            res.json(results.insertId)
        }
    })
});

router.get('/:id', function(req, res, next) {
    console.log('in')
    let id = req.params.id,
        response = {}
    database.sendQuery(`SELECT * FROM recipe WHERE id = ${id}`, function (err, results) {
        if (err) {

        } else {
            response.recipe = results[0]
            database.sendQuery(`SELECT * FROM ingredients WHERE id_recipe = ${id}`, function (err, results) {
                if (err) {

                } else {
                    response.ingredients = results
                    database.sendQuery(`SELECT * FROM steps WHERE id_recipe = ${id}`, function (err, results) {
                        if (err) {

                        } else {
                            response.steps = results
                            database.sendQuery(`SELECT * FROM comments WHERE id_recipe = ${id}`, function (err, results) {
                                if (err) {

                                } else {
                                    response.comments = results
                                    res.json(response)
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});

module.exports = router;