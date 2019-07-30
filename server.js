var express = require("express");
var router = express.Router();
var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");
var list = require("./output.json");
var list2 = require("./output2.json");
var list3 = require("./output3.json");
var list4 = require("./output4.json");
var app = express();

app.use(express.static("public"));

app.get("/output.json", function(req, res, next) {
  res.sendFile(__dirname + "/output.json");
});

app.get("/output2.json", function(req, res, next) {
  res.sendFile(__dirname + "/output2.json");
});

app.get("/output3.json", function(req, res, next) {
  res.sendFile(__dirname + "/output3.json");
});

app.get("/output4.json", function(req, res, next) {
  res.sendFile(__dirname + "/output4.json");
});

app.get("/info.json", function(req, res, next) {
  res.sendFile(__dirname + "/info.json");
});

app.get("/scrape", function(req, res) {
  url =
    "https://finance.yahoo.com/screener/predefined/ms_real_estate?count=100&offset=0";

  request(url, function(err, resp, table) {
    $ = cheerio.load(table);
    var json = { info: [] };
    links = $(`a`); //jquery get all hyperlinks
    $(links).each(function(i, link) {
      json.info.push({
        name: $(link).text(),
        link: "https://finance.yahoo.com" + $(link).attr("href")
      });
    });
    var adjust = json.info.length;
    var resultsNeeded = (adjust.length = 131);
    var j = { info: [] };
    for (var i = 31; i < resultsNeeded; i++) {
      j.info.push(json.info[i]);
    }
    fs.writeFile("output.json", JSON.stringify(j, null, 4), function(err) {
      console.log(
        "File successfully written! - Check your project directory for the output.json file"
      );
    });
    res.send("Check your console!");
  });
});

app.get("/scrape2", function(req, res) {
  url =
    "https://finance.yahoo.com/screener/predefined/ms_real_estate?count=100&offset=100";

  request(url, function(err, resp, table) {
    $ = cheerio.load(table);
    var json2 = { info: [] };
    links = $(`a`); //jquery get all hyperlinks
    $(links).each(function(i, link) {
      json2.info.push({
        name: $(link).text(),
        link: "https://finance.yahoo.com" + $(link).attr("href")
      });
    });
    var adjust = json2.info.length;
    var resultsNeeded = (adjust.length = 131);
    var j2 = { info: [] };
    for (var i = 31; i < resultsNeeded; i++) {
      j2.info.push(json2.info[i]);
    }
    fs.writeFile("output2.json", JSON.stringify(j2, null, 4), function(err) {
      console.log(
        "File successfully written! - Check your project directory for the output2.json file"
      );
    });
    res.send("Check your console!");
  });
});

app.get("/scrape3", function(req, res) {
  url =
    "https://finance.yahoo.com/screener/predefined/ms_real_estate?count=100&offset=200";

  request(url, function(err, resp, table) {
    $ = cheerio.load(table);
    var json3 = { info: [] };
    links = $(`a`); //jquery get all hyperlinks
    $(links).each(function(i, link) {
      json3.info.push({
        name: $(link).text(),
        link: "https://finance.yahoo.com" + $(link).attr("href")
      });
    });
    var adjust = json3.info.length;
    var resultsNeeded = (adjust.length = 131);
    var j3 = { info: [] };
    for (var i = 31; i < resultsNeeded; i++) {
      j3.info.push(json3.info[i]);
    }
    fs.writeFile("output3.json", JSON.stringify(j3, null, 4), function(err) {
      console.log(
        "File successfully written! - Check your project directory for the output3.json file"
      );
    });
    res.send("Check your console!");
  });
});

app.get("/scrape4", function(req, res) {
  url =
    "https://finance.yahoo.com/screener/predefined/ms_real_estate?count=100&offset=300";

  request(url, function(err, resp, table) {
    $ = cheerio.load(table);
    var json4 = { info: [] };
    links = $(`a`); //jquery get all hyperlinks
    $(links).each(function(i, link) {
      json4.info.push({
        name: $(link).text(),
        link: "https://finance.yahoo.com" + $(link).attr("href")
      });
    });
    var adjust = json4.info.length;
    var resultsNeeded = (adjust.length = 131);
    var j4 = { info: [] };
    for (var i = 31; i < resultsNeeded; i++) {
      j4.info.push(json4.info[i]);
    }
    fs.writeFile("output4.json", JSON.stringify(j4, null, 4), function(err) {
      console.log(
        "File successfully written! - Check your project directory for the output4.json file"
      );
    });
    res.send("Check your console!");
  });
});

// app.get("/scompany", function(req, res) {
//   var companyName = [];
//   list.info.forEach(element => {
//     companyName.push(element.name);
//   });
//   list2.info.forEach(element => {
//     companyName.push(element.name);
//   });
//   list3.info.forEach(element => {
//     companyName.push(element.name);
//   });
//   list4.info.forEach(element => {
//     companyName.push(element.name);
//   });
//   var urls = [];
//   var js2 = { info: [] };
//   for (var i = 0; i < companyName.length; i++) {
//     urls.push(
//       `https://finance.yahoo.com/quote/${companyName[i]}/profile?p=${
//         companyName[i]
//       }`
//     );
//   }
//   urls.forEach(url => {
//     request(url, function(err, resp, section) {
//       $ = cheerio.load(section);
//       // var l = urls.length
//       for (var j = 0; j < companyName.length; j++) {
//         var sec = $("p");
//         $(sec).each(function(i, des) {
//           const name = companyName[i];
//           js2.info.push(companyName[i], { description: $(des).text() });
//         });
//       }
//       fs.writeFile("info.json", JSON.stringify(js2, null, 4), function(err) {
//         console.log(
//           "File successfully written! - Check your project directory for the info.json file"
//         );
//       });

//       res.send("Check your console!");
//     });
//   });
// });

app.listen("8081");
console.log("Magic happens on port 8081");
exports = module.exports = app;
