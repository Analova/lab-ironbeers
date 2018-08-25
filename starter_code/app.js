
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});


app.get("/beers",(req,res,next)=>{
  punkAPI.getBeers()
  .then(PunkAPIBeers => {
    //console.log( "RANDOM BEER", beers[0] )
    let data={
      beersForView: PunkAPIBeers 
    };
    res.render("beers", data);
  });
});




app.get("/random-beer",(req,res,next)=>{
  punkAPI.getRandom()
  .then(beers => {
    res.render("random-beer", {
      beer: beers[0]
    });
  });
});


app.listen(3000);