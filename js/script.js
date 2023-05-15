'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!', event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = this.getAttribute('href');
  console.log('articleSelector', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle', targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(){
  console.log('generateTitleLinks', generateTitleLinks);

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles', articles);

  let html = '';

  for(let article of articles){


    /* [DONE] get the article id */

    const articleID = article.id;
    console.log('articleID:', articleID);

    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('articleTitle', articleTitle);

    /* [DONE] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML:', linkHTML);

    /* [DONE] insert link into titleList */
    html = html + linkHTML;
    console.log('html', html);
  }
  titleList.innerHTML = html;
  console.log('titleList', titleList);

  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){

  /* [DONE]find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles', articles);

  /* [DONE]START LOOP: for every article: */

  for(let article of articles){

    /* [DONE]find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE]make html variable with empty string */
    let html = '';

    /* [DONE]get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags', articleTags);

    /* [DONE]split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray', articleTagsArray);

    /* [DONE]START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log('tag', tag)

      /* [DONE]generate HTML of the link */
      const linkHTML = '<li><a href="#' + articleTagsArray + '">' + tag + '</a></li>';
      console.log('linkHTML:', linkHTML);

      /* [DONE]add generated code to html variable */
      html = html + linkHTML;
      console.log('html', html);

    /* [DONE]END LOOP: for each tag */
    }

    /* [DONE]insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log('tagsWrapper', tagsWrapper);

    const links = document.querySelectorAll(articleTagsArray);
    console.log('links:', links);

    for(let link of links){
      link.addEventListener('click', generateTags);
    }

  /* [DONE]END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){
  /* [DONE]prevent default action for this event */
  event.preventDefault();
  console.log('Link was clicked!', event);

  /* [DONE]make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = document.getAtribute('href');
  console.log('href', href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.querySelector('tag');
  console.log('tag', tag);

  /* find all tag links with class active */


  /* START LOOP: for each active tag link */

    /* remove class active */

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */

    /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();
