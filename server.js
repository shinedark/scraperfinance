var express = require('express');
var router = express.Router();
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var list  = require('./output.json')
var app     = express();


app.use(express.static('public'));

app.get('/output.json', function(req, res, next) {
  res.sendFile(__dirname + '/output.json');
})

app.get('/info.json', function(req, res, next) {
  res.sendFile(__dirname + '/info.json');
})

app.get('/scrape', function(req, res){
  url = 'https://finance.yahoo.com/screener/predefined/ms_real_estate?offset=0&count=100';
  request(url, function(err, resp, table){
    $ = cheerio.load(table);
    var json = { info: []};
    links = $(`a`); //jquery get all hyperlinks
    $(links).each(function(i, link){
      json.info.push({name: $(link).text(),link: 'https://finance.yahoo.com' +  $(link).attr('href')})
    });
      var adjust = json.info.length;
      var resultsNeeded = adjust.length = 130;
      var j = { info: []};
      for (var i = 30; i < resultsNeeded; i++){
        j.info.push(json.info[i])
      }
    fs.writeFile('output.json', JSON.stringify(j, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })
    res.send('Check your console!')
  })
})

app.get('/scompany', function(req, res){
  var companyName = [];
  list.info.forEach(element => {
    companyName.push(element.name)
  });
  var urls = []
  for (var i = 0; i < companyName.length; i++){
     urls.push(`https://finance.yahoo.com/quote/${companyName[i]}/profile?p=${companyName[i]}`);
  }
  
  urls.forEach(url => {
    request(url, function(err, resp, section ){
    $ = cheerio.load(section);
    var json2 = { info: []};
    var l = urls.length
    for(var i = 0; i < l; i++){
      var sec = $('p')
      $(sec).each(function(i, des){
        json2.info.push({description: $(des).text()})
      });
    }
    fs.writeFile('info.json', JSON.stringify(json2, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the info.json file');
    })
  
    res.send('Check your console!')
  })
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
