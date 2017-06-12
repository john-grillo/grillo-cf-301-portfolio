'use strict';

// view object configuration, to hold all our functions for dynamic updates
// and article-related event handlers. Powered by jQuery functions..
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    var authorName, category, optionTag;
    if (!$(this).hasClass('template')) {

      //All author  names are being scrapped and added to the author option filter
      // Authors' name is grabbed in the $(this) element, which jQuery grabs from every page article. Then, that option is populated via the optionTag variable.
      //Finally, #author-filter is appended with the data in the jQuery object.
      authorName = $(this).attr('data-author');
      optionTag = '<option value="' + authorName + '">' + authorName + '</option>';

      if ($('#author-filter option[value="' + authorName + '"]').length === 0) {
        $('#author-filter').append(optionTag);
      }

      //This code bloc will check to see if the category name already exists
      category = $(this).attr('data-category');
      optionTag = '<option value="' + category + '">' + category + '</option>';
      if ($('#category-filter option[value="' + category + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
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
articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      var filterVal = $(this).val();
      $('article').each(function(index) {
        var catStandOut = $('article').eq(index).attr('data-category');
        $('article').eq(index).hide();

        if (filterVal === catStandOut) {
          $('article').eq(index).fadeIn(750);
        }  //end of if block
      });
    } else {
      $('article').show();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
//end of Category filter  
};

//beginning of main navigation handler
articleView.handleMainNav = function() {
    //So all list item 'tabs' in the main-nav class will, on click...
    //The idea is that it by default it will hide the tabs and then show just the tabbed content selcted by the user via a click.
    //$('main-nav) grabs the
    $('.main-nav li.tab').on('click', function(){
        $('.tab-content').hide();
        var clickedTab = $(this).data('content');
        $('#' + clickedTab).show();

     //end of on-click section   
    });
    $('.main-nav .tab:first').click(); //this will set up the page by default. Otherwise, nothing would show

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