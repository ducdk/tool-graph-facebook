const express = require('express')
const jsonfile = require('jsonfile');
const request = require('request');
const app = express()

const FILE_OUTPUT = __dirname + '/result.json';
const access_token = 'EAAXvL47ihEIBAGhsj8ZCNI6JRqjP2dPxn6ZC3XCn1MupYQ1VvtNdHPtAOGJBSqlvEa1lI0UsHBR6SP5bAMU9wxcOrH2b0dIyozH1hkToYJld4i0AEGz5B6eosbkLv7n8e9r2FekVykFZABPIUWZA4FzZBY5ecHR8AzKrcIjPygAZByDNbNggqds98qjZBBSztxxpfHKfbEttwZDZD';

var port = process.env.PORT || 8080;


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {

    console.log(req.path);
    res.render('index');
});

app.get('/result', function(req, res) {

    console.log(req.path);
    const url = 'https://graph.facebook.com/v2.8/1597163410610277/feed?access_token=' + access_token + '&format=json';
    let arr = [];
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            let t = JSON.parse(body);
            for (let i = 0; i < t['data'].length; i++) {
                arr.push(t['data'][i])
            }
        }
    });
    setTimeout((function() { res.send(arr) }), 1000);
})

app.get('/post/:id', function(req, res) {
    res.render('article');
})

app.post('/post/:id', function(req, res) {
    console.log(req.path);
    const url = 'https://graph.facebook.com/v2.8/' + req.params.id + '/comments?access_token=' + access_token + '';
    let arr = [];
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            let t = JSON.parse(body);
            for (let i = 0; i < t['data'].length; i++) {
                arr.push(t['data'][i])
            }
        }
    });
    setTimeout((function() { res.send(arr) }), 1000);
})

app.post('/comments/:id', function(req, res) {
    console.log(req.path);
    let comment = "Thank you! :)";
    const url = 'https://graph.facebook.com/v2.8/' + req.params.id + '/comments?access_token=' + access_token + '';
    let arr = [];
    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: url,
        body: "message=" + comment
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            let t = JSON.parse(body);
            for (let i = 0; i < t['data'].length; i++) {
                arr.push(t['data'][i])
            }
        }
    });
    setTimeout((function() { res.send(arr) }), 1000);
})

app.listen(port, () => console.log('Server app listening on port:' + port));