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

app.get('/scrape', function(req, res){
  url = 'https://finance.yahoo.com/screener/predefined/ms_real_estate?offset=0&count=100';
  request(url, function(err, resp, table){
    $ = cheerio.load(table);
    var json = { info: []};
    links = $('a'); //jquery get all hyperlinks
    $(links).each(function(i, link){
     
      json.info.push({name: $(link).text(),link: 'https://finance.yahoo.com' +  $(link).attr('href')})
    });
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })
  
    res.send('Check your console!')
  })
})

// app.get('/scompany', function(req, res){
//   var companyName = [];
//   list.info.forEach(element => {
//     companyName.push(element.name)
//   });

//   companyName.forEach(el => {
//     url = `https://finance.yahoo.com/quote/${el}/profile?p=${el}`;
//   })
 
//   request(url, function(err, resp, section){
//     $ = cheerio.load(section);
//     var json2 = { info: []};
//     description = $(this).next().next().html()
//     $(description).each(function(i, des){
//       console.log(des)
//       // json2.info.push({description: $(des).text()})
//     });
//     // fs.writeFile('info.json', JSON.stringify(json2, null, 4), function(err){
//     //   console.log('File successfully written! - Check your project directory for the info.json file');
//     // })
  
//     // res.send('Check your console!')
//   })
// })

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
