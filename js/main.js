const $_ = function(selector, node = document){
    return node.querySelector(selector);
  };
  
  import { movies } from "./kinolar.js";
  
  const wrapperElement = $_(".box_wrapper");
  const template = $_(".card_box_template").content;
  
  const movieFragment = document.createDocumentFragment();
  
  movies.forEach((movie) => {
    const wrapperClone = template.cloneNode(true);
  
    $_(".movieName", wrapperClone).textContent = movie.title;
    $_(".movie_img", wrapperClone).src = movie.bigThumbnail;
    $_(".country", wrapperClone).textContent = movie.language;
    $_(".year", wrapperClone).textContent = movie.year;
    $_(".rating_point", wrapperClone).textContent = movie.imdbRating;
    $_(".genre", wrapperClone).textContent = movie.categories;
  
  
  
  
    movieFragment.appendChild(wrapperClone);
  
  });
  
  wrapperElement.appendChild(movieFragment);
  
  