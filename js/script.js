'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  tagsListSelector: '.list.tags',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorListSelector: '.list.authors'
};

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(opts.titleListSelector);

  /* [DONE] for each article */
  const articles = document.querySelectorAll(opts.articleSelector + customSelector);

  let html = '';

  for(let article of articles){


    /* [DONE] get the article id */

    const articleID = article.getAttribute('id');

    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */

    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;

    /* [DONE] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';

    /* [DONE] insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(tags){

  const params = {
    max: 0,
    min: 999999
  };

  for(let tag in tags){
    if(tags[tag] > params.max) {
      params.max = tags[tag];
    }
    else(tags[tag] < params.min); {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opts.cloudClassCount - 1) + 1 );

  return opts.cloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* [DONE]find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /* [DONE]START LOOP: for every article: */

  for(let article of articles){

    /* [DONE]find tags wrapper */
    const tagsWrapper = article.querySelector(opts.articleTagsSelector);

    /* [DONE]make html variable with empty string */
    let html = ' ';

    /* [DONE]get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* [DONE]split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* [DONE]START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /* [DONE]generate HTML of the link */
      const linkHTML = '<li><a href="#' + 'tag-' + tag + '">' + tag + '</a></li>';

      /* [DONE]add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    /* [DONE]END LOOP: for each tag */
    }

    /* [DONE]insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

    const links = document.querySelectorAll(articleTagsArray);

    for(let link of links){
      link.addEventListener('click', generateTags);
    }

    /* [DONE]END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opts.tagsListSelector);
  console.log('tagList:', tagList);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */

    const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"> ' + tag + '</a></li>';
    allTagsHTML += tagLinkHTML;
    console.log('tagLinkHTML:', tagLinkHTML);
    /* [NEW] END LOOP: for each tag in allTags: */
  }

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}
generateTags();

function tagClickHandler(event){
  /* [DONE]prevent default action for this event */
  event.preventDefault();

  /* [DONE]make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [DONE]make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');

  /* [DONE]find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('activeTagLinks', activeTagLinks);

  /* [DONE]START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
    /* [DONE]remove class active */
    activeTagLink.classList.remove('active');
    /* [DONE]END LOOP: for each active tag link */
  }

  /* [DONE]find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tagLinks', tagLinks);

  /* [DONE]START LOOP: for each found tag link */
  for(let tagLink of tagLinks){
    /* [DONE]add class active */
    tagLink.classList.add('active');
  /* [DONE]END LOOP: for each found tag link */
  }
  /* [DONE]execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* [DONE]find all links to tags */
  const tags = document.querySelectorAll('.post-tags a, .tags a');

  /* [DONE]START LOOP: for each link */
  for(let tag of tags){
    /* [DONE]add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors(){

  let allAuthorsList = {};

  /* [DONE]find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /* [DONE]START LOOP: for every article: */
  for(let article of articles){

    /* find authors wrapper */
    const authorWrapper = article.querySelector(opts.articleAuthorSelector);

    /* [DONE]make html variable with empty string */
    let html = '';

    /* [DONE]get authors from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');

    /* [DONE] generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';

    /* [DONE] add generated code to html variable */
    html = html + linkHTML;

    /* [NEW] check if this link is NOT already in allAuthorsList */
    if(!allAuthorsList.hasOwnProperty(articleAuthor)){
      allAuthorsList[articleAuthor] = 1;
    } else {
      allAuthorsList[articleAuthor]++;
    }


    /* [DONE] END LOOP: for each author */
    authorWrapper.innerHTML = html;
  }

  const authorList = document.querySelector(opts.authorListSelector);
  let authorListHTML = '';

  for (let author in allAuthorsList){
    authorListHTML += '<li><a href="#author-' + author + '"><span>' + author + '(' + allAuthorsList[author] + ')</span></a></li>';
  }

  authorList.innerHTML = authorListHTML;
}
generateAuthors();

function authorClickHandler(event){
  /* [DONE]prevent default action for this event */
  event.preventDefault();

  /* [DONE]make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE]make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [DONE]make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-','');

  /* [DONE]find all author links with class active */
  const authorActiveLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('authorActiveLinks', authorActiveLinks);

  /* [DONE]START LOOP: for each active author link */
  for(let authorActiveLink of authorActiveLinks){
    /* [DONE]remove class active */
    authorActiveLink.classList.remove('active');
    /* [DONE]END LOOP: for each active author link */
  }

  /* [DONE]find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE]START LOOP: for each found author link */
  for(let authorLink of authorLinks){
    /* [DONE]add class active */
    authorLink.classList.add('active');
    /* [DONE]END LOOP: for each found author link */
  }

  /* [DONE]execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* [DONE]find all links to authors */
  const allAuthorLinks = document.querySelectorAll('a[href^="#author-"]');
  console.log('allAuthorsLinks', allAuthorLinks);

  /* [DONE]START LOOP: for each link */
  for(let allAuthorLink of allAuthorLinks){
  /* [DONE]add authorClickHandler as event listener for that link */
    allAuthorLink.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }

}
addClickListenersToAuthors();

