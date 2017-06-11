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
  var $newArticle = $('article.template').clone();
  $newArticle.removeClass('template');
  if (!this.publishedOn) {
    $newArticle.addClass('draft');
  }

  //Big sections, here is what they all do. These first two methods will grab the attributes of data-category and author
  $newArticle.attr('data-category', this.category);
  $newArticle.attr('data-author', this.author);

//and now, across our psuedo-JSON in blogArticles.js, we will find each appropriate tag [byline, h1, .article-body, etc]
//and then we will append each section of that information using just jquery
  $newArticle.find('.byline a').html(this.author);
  $newArticle.find('.byline a').attr('href', this.authorUrl);
  $newArticle.find('h1:first').html(this.title);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time[pubdate]').attr('datetime', this.publishedOn);
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');

  //and now we append all of this to the <hr> tag so we have a nice visual line seperating it all out.
  $newArticle.append('<hr>');
  return $newArticle;
  //end of .toHtml prototype
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(articleObject) {
  // REVIEW: Take a look at this forEach method; This may be the first time we've seen it.
  articles.push(new Article(articleObject));
});

articles.forEach(function(article) {
  $('#articles').append(article.toHtml());
});

// Toggle click the mobile menu
var $menu = $('nav.main-nav ul');

$('.icon-menu').click(function() {
  $menu.toggleClass('open');
});

