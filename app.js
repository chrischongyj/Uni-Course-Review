var express = require('express');
var app = express();
const fetch = require("node-fetch");

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

// Home page route.
app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/404', function (req, res) {
  res.sendFile(__dirname + '/public/404.html');
});

// About page route.
app.get('/contact', function (req, res) {
  res.sendFile(__dirname + '/public/contact.html');
});

app.get('/course/:course', function (req, res) {
  req.params.course = req.params.course.toUpperCase();
  var isValid = false;

  fetch('https://api.nusmods.com/v2/2019-2020/moduleList.json')
  .then(response => {
    return response.json()
  })
  .then(data => {

    for (var i = 0; i < data.length; i++) {

      if (data[i].moduleCode == req.params.course) {
        res.render('course', {course: req.params.course, coursename: data[i].title});
        isValid = true;
        return;
      }
    }
  })
  .catch(err => {
    // Do something for an error here
    console.log(err)
  })

  fetch('https://raw.githubusercontent.com/chrischongyj/Uni-Course-Review/master/public/ntucourses.json')
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here

    for (var i = 0; i < data.length; i++) {

      if (data[i].FIELD1 == req.params.course) {
        res.render('course', {course: req.params.course, coursename: data[i].FIELD2});
        isValid = true;
        return;
      }

    }

  })
  .catch(err => {
    // Do something for an error here
    console.log(err)
  })

  fetch('https://raw.githubusercontent.com/chrischongyj/Uni-Course-Review/master/public/ntucourses2.json')
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here

    for (var i = 0; i < data.length; i++) {

      if (data[i].FIELD1 == req.params.course) {
        res.render('course', {course: req.params.course, coursename: data[i].FIELD2});
        isValid = true;
        return;
      }

    }

  })
  .catch(err => {
    // Do something for an error here
    console.log(err)
  })
  


});



app.listen(3000, ()=>console.log('Listening...'));

// process.env.PORT