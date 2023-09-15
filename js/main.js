const $_ = function (selector, node = document) {
  return node.querySelector(selector);
};

const $$_ = function (selector, node = document) {
  return node.querySelectorAll(selector);
};

const ALL_CATEGORY_TAB = "ALL";
const categories = [];


  import { movies } from "./kinolar.js";
  const searchInput = $_(".search_input");
  const wrapperElement = $_(".box_wrapper");
  const genreWrapper = $_(".genres_select");
  const template = $_(".card_box_template").content;
  

const displayMovies = function(movies){
  const moviesFragment = document.createDocumentFragment();
wrapperElement.innerHTML="";
movies.forEach((movie) => {
  const wrapperClone = template.cloneNode(true);
  
  $_(".movieName", wrapperClone).textContent = movie.title;
  $_(".movie_img", wrapperClone).src = movie.bigThumbnail;
  $_(".country", wrapperClone).textContent = movie.language;
  $_(".year", wrapperClone).textContent = movie.year;
  $_(".rating_point", wrapperClone).textContent = movie.imdbRating;
  $_(".genre", wrapperClone).textContent = movie.categories;

  moviesFragment.appendChild(wrapperClone);
});

wrapperElement.appendChild(moviesFragment);
};

displayMovies(movies);
const displayGenres = function(categories){
  const categoryFragment = document.createDocumentFragment();
  const categoryTemplate = $_(".genre_template").content;
  categories.forEach((category) => {
    const categoryItem = categoryTemplate.cloneNode(true);

    $_(".genre_option", categoryTemplate).textContent = category;
    $_(".genre_option", categoryTemplate).dataset.id = category;

    categoryFragment.appendChild(categoryItem);
  } );

  genreWrapper.appendChild(categoryFragment);
};

movies.forEach((movie) => {
  // 
  movie.categories.forEach((category) =>{
    if(!categories.includes(category)){
      categories.push(category);
    }
  });
});

displayGenres(categories);
genreWrapper.addEventListener("click", (evt) => {
  evt.preventDefault();
  let newSelect;
  if(evt.target.matches("option") && evt.target.dataset.id !==ALL_CATEGORY_TAB){
    newSelect=movies.filter((movie) =>{
      return movie.category.includes(evt.target.dataset.id);
    });
  } else if (evt.target.matches("option") && evt.target.dataset.id ===ALL_CATEGORY_TAB)
  {newSelect = movies; }
  displayMovies(newSelect);
});

searchInput.addEventListener("keyup", (evt) => {
  const inputValue = new RegExp(evt.target.value, `gi`);
  const newMovies = movies.filter((movie) => movie.title.match(inputValue));

  displayMovies(newMovies);
});