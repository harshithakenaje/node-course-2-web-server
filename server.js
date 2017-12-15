var express = require('express');
var hbs = require('hbs');
var fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('viewengine','hbs');


// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// })
app.use(express.static(__dirname + '/public')); 
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method}  ${req.url}`
    fs.appendFile('server.log', log +'\n');
   next();
});

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
app.get('/',(req,res)=>{
//   res.send('<h1>Hello express</h1>');
res.render('home.hbs',{
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome Andrew'
    });
});
app.get('/about', (req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About page',
        welcomeMessage: 'Welcome to website'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Unable to connect'
    });
});

app.listen(3000,()=>{
    console.log('Server is up now')
});