const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')
app.get('/', function (req, res) {
    res.render('index', {
        users: [],
        title: 'test',
        value: 'test1'
    });
})
app.post('/city', (req, res) => {
    res.send(res);
})
app.get('/test', (req, res) => {
    res.send({
        user: {
            name: 'Bahman',
            family: 'Enayatei',
            age: 21
        }
    })
})

app.listen(3000, function () {
    console.log('App listening on port 3000!')
})