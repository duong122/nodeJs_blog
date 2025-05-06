const express = require('express');
const morgan = require('morgan');
const handlerBars = require('express-handlebars');
const path = require('path');
const app = express();
const route = require('./routes/index');
const db = require('./config/db')
const port = 3000;
var methodOverride = require('method-override')

db.connect()

// Override method
app.use(methodOverride('_method'))

// Static file
app.use(express.static(path.join(__dirname, 'public')));

// Body parse
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

// HTTP LOGGER
app.use(morgan('combined'));

// Template engine
app.engine(
  'hbs',
  handlerBars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b
  }
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
