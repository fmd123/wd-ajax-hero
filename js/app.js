(function() {
  'use strict';
  var movies = [];

  const renderMovies = function() {
    console.log("render movies here");
    $('#listings').empty();
    // This method removes not only child (and other descendant) elements, but also any text within the set of matched elements.
    console.log( "inside render: ", movies);
    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({
        delay: 50
      }).text(movie.title);
      //if hover the element with mouse, the title attribute is displayed in a little box next to the element

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };
  // :::::::::::::::::::::::::::::::::::::::::::::::::::::
  $(document).on('ready', () => {

    //EVENT HANDLER FOR input button
    $("form").on("submit", function(event) {
      event.preventDefault();

      //the default action of the event will not be triggered.
      var searchTerm = $("#search").val().trim();
      //console.log(searchTerm);

      //search term will be the value of whatever user puts into input id = search.
      //plug searchTerm into getResults function
      getResults(searchTerm);
      $("#search").text("");
      movies = [];

    });

    function getResults(searchTerm) {

      $.ajax({
        url: 'https://omdb-api.now.sh/',
        method: "GET",
        dataType: "json",
        data: {
          s: searchTerm
        }
      }).done((response) => {
        console.log("response is:");
        console.log(response);
        var searchResult = response.Search;
        console.log( "searchResult is:");
        console.log(searchResult);
        parseMovies(searchResult);
      });
    }


    function parseMovies(searchResult){
      for (let i = 0; i<searchResult.length; i++){
        let movie= {
          id: searchResult[i].imdbID,
          poster: searchResult[i].Poster,
          title: searchResult[i].Title,
          year: searchResult[i].Year,
          //create a movie object for each movieResponse (item) of searchResult
        }
        // console.log("movie is:");
        // console.log(movie);
        movies.push(movie);
        console.log("movies: ", movies);

      }
      console.log(movies);
      renderMovies();
    }





    // ADD YOUR CODE HERE
  }); //end of document.ready fn
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
})(); //END OF first thingy fn.
