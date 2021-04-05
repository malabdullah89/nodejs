const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')


 
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:Joodm%401989@cluster0.bdxof.mongodb.net/newAppDB?retryWrites=true&w=majority',  { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection
db.on('err', err => console.error(err))
db.once('open', ()=> console.log("Connected to MongoDB"))
app.use('/', indexRouter)


app.listen(process.env.PORT || 3000)