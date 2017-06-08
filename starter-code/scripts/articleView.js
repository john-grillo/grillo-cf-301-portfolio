'use strict';

// view object configuration, to hold all our functions for dynamic updates
// and article-related event handlers. Powered by jQuery functions..
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    var authorName, category, optionTag;
    if (!$(this).hasClass('template')) {

      //All authoer names are being scrapped and added to the author option filter
      // Author's name is grabbed in the $(this) element, which jQuery grabs from every page article. Then, that option is populated via the optionTag variable.
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

//the final code bloc will call all of the above functions.
//this was written first because we fundamentally needed these items to create
//a dynamic webpage.

$(document.readyState() {
    articleView.populateFilters();
    articleView.handleAuthorFilter();
    articleView.handleCategoryFilter();
    articleView.handleMainNav();
    articleView.setTeasers();


//end document.ready
});