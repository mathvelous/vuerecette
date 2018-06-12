var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'mysql-vuerecette.alwaysdata.net',
    user     : '161130',
    password : 'vuerecette',
    database : 'vuerecette_bdd'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected')
});

function sendQuery(query, callback) {
    connection.query(query, function (error, results, fields) {
        if(error){
            callback(error)
        }else {
            callback(null, results)
        }
    })
}

module.exports = ({sendQuery: sendQuery});