var express = require('express');
var app = express();
const fetch = require("node-fetch");

app.set('view engine', 'ejs');

app.use(express.static("public"));

// Home page route.
app.get('/', function (req, res) {
  res.sendFile('/index.html');
});

// About page route.
app.get('/contact', function (req, res) {
  res.sendFile(__dirname + '\\public\\contact.html');
});

app.get('/course/:course', function (req, res) {
  req.params.course = req.params.course.toUpperCase();
  fetch('https://api.nusmods.com/v2/2019-2020/moduleList.json')
  .then(response => {
    return response.json()
  })
  .then(data => {

    for (var i = 0; i < data.length; i++) {

      if (data[i].moduleCode == req.params.course) {
        res.render('course', {course: req.params.course, coursename: data[i].title});
        return;
      }
      res.sendFile(__dirname + '\\public\\contact.html')
    }

  })
  .catch(err => {
    // Do something for an error here
    console.log(err)
    res.sendFile(__dirname + '\\public\\contact.html')
  })
  
});

app.listen(3000, ()=>console.log('Listening at port 3000...'));