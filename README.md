node-web-scraper 
repo from tutorial https://github.com/scotch-io/node-web-scraper 
``` shell
$ npm install
$ nodemon 
```

got to http://localhost:8081/ to see the list of companies that invest in residential investments.

Process 

Scrape [Yahoo](https://finance.yahoo.com/screener/predefined/ms_real_estate?count=100&offset=100) the problem is that if you then apply filters to the search like the residential one. It won't affect the url so you  to scrape everything in the real state market then you have to check for the industry REIT - Residential. And finally get the links and phone numbers. Also note some companies have multiple stocks so and the information for site and phone is the same. So I had to manually check for that. 



 

