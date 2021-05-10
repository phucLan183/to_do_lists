require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

//Setting
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

const routes = require('./routes/todo')
app.use(routes)

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log(`Start in http://localhost:${port}`);
});