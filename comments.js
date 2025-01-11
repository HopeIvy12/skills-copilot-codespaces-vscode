// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Load comments from file
var comments = JSON.parse(fs.readFileSync('comments.json'));

// Get comments
app.get('/comments', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

// Add comment
app.post('/comments', function(req, res) {
  var comment = req.body;
  comments.push(comment);
  saveComments();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comment));
});

// Update comment
app.put('/comments/:id', function(req, res) {
  var id = req.params.id;
  var comment = req.body;
  comments[id] = comment;
  saveComments();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comment));
});

// Delete comment
app.delete('/comments/:id', function(req, res) {
  var id = req.params.id;
  comments.splice(id, 1);
  saveComments();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

// Save comments to file
function saveComments() {
  fs.writeFileSync('comments.json', JSON.stringify(comments));
}

// Start server
app.listen(3000, function() {
  console.log('Server is running on http://localhost:3000');
});