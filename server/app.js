var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var todosRouter = require('./routes/todos');
var commentsRouter = require('./routes/comments');
var loginRouter = require('./routes/login')

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/todos', todosRouter);
app.use('/comments', commentsRouter);
app.use('/login', loginRouter);

module.exports = app;
