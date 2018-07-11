const express = require('express')
const jsonfile = require('jsonfile');
const app = express()

const FILE_OUTPUT = __dirname + '/result.json';

var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/result', function(req, res) {
    let arr = [];
    res.send(arr);
})

app.get('/articles', function(req, res) {
    let arr = {};
    res.render('article', arr);
})

app.get('/articles/:id', function(req, res) {
    if (req.params.slug && req.params.id) {
        slug = req.params.slug;
        id = req.params.id;
    }
    let dat = [];
    res.send(dat);
})

app.listen(port, () => console.log('Server app listening on port:' + port));