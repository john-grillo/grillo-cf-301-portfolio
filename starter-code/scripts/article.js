'use strict';

var articles = [];

function Article (rawDataObj) {
  // TODO: Use the JS object passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}

Article.prototype.toHtml = function () {
//portfolio piece 4 update: project automated using Handlebars.js
//see older versions non-handlebars implementation, namely portfolio3 branch
//Please see the documentation here for Handlebars.js || http://handlebarsjs.com/reference.html
  var templateFiller = Handlebars.compile($('#article-template').html());
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';

  var filledTemplate = templateFiller(this);
  return filledTemplate;

};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(articleObject) {
  articles.push(new Article(articleObject));
});

articles.forEach(function(article){
  $('#articles').append(article.toHtml());
});