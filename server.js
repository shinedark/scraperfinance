var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  url = 'https://finance.yahoo.com/screener/predefined/ms_real_estate?offset=0&count=100';
  request(url, function(err, resp, table){
    $ = cheerio.load(table);
    var json = { info: []};
    links = $('a'); //jquery get all hyperlinks
    $(links).each(function(i, link){
     
      json.info.push(i, $(link).text() + ':\n  ' +'https://finance.yahoo.com' + $(link).attr('href'))
    });
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })
  
    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
