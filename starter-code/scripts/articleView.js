'use strict';

// view object configuration, to hold all our functions for dynamic updates
// and article-related event handlers. Powered by jQuery functions..
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      //ArticleView function was rewritten to allow for easier interpolation.
      var optionTag = `<option value="${val}">${val}</option>`;

      if ($(`#author-filter option[value="${val}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#category-filter option[value="${val}"]`).length === 0) {
        $('#category-filter').append(optionTag);
      //end of if bloc
      }
    //end of outer if bloc
    }
  //end of populateFilters function
  });

//end articleView populatefilter function
};



articleView.handleAuthorFilter = function() {
  //code refactored to improve useability
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
      //in the event that the selection box has a bad/blank option,
           // all articles are shown except the one article we are using as a template
           //information on HIDE: https://api.jquery.com/hide/
           //information on SHOW: https://api.jquery.com/show/
           //information on .val: https://api.jquery.com/val/
    }
    $('#category-filter').val('');
  });
};

// Category Filter
//refatored to take advantage of the Handlebars.js
articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

//beginning of main navigation handler
articleView.handleMainNav = function () {
  //So all list item 'tabs' in the main-nav class will, on click...
  //The idea is that it by default it will hide the tabs and then show just the tabbed content selcted by the user via a click.
  //$('main-nav) has been rewritten for automation.
  $('.main-nav').on('click', '.tab', function () {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();//this will set up the page by default. Otherwise, nothing would show

  //end of handleMainNav  
};

//set up teasers. Hey, we want to hook people with our content, right?
articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if ($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn(750);
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      },200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};


//the final code bloc will call all of the above functions.
//this was written first because we fundamentally needed these items to create
//a dynamic webpage.

$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();

  //end of document.ready.
});