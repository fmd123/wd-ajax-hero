// wait for DOM
$(document).on('ready', () => {
  console.log('Give me fuel give me fire.');


  // form event handler
  $("form").submit((event) => {
    event.preventDefault();

    // get user search term
    let searchTerm = $("#search-term").val().trim();
    console.log("searchTerm is", searchTerm);

    getAlbums(searchTerm)
  });

  // go to spotify api and album JSON data
  function getAlbums(searchTerm) {
    console.log("doing tough ajax stuff with", searchTerm)

    // do the AJAX
    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      method: 'GET',
      dataType: 'JSON',
      headers: { Authorization: "Bearer YOURTOKENHERE" },
      data: {
        q: `artist:${searchTerm}`,
        type: "album",
        limit: 18
      }
    }).done((response) => {
      console.log("data from spotify is...", response)
      parseAlbum(response)
    }).fail((err) => { console.log("a bad thing happened with getting albums", err) })
  }

  // extract albums from JSON AND add to DOM
  function parseAlbum(response) {
    let albums = response.albums.items
    console.log("parsing your album, YO!", albums)

    // go through albums, extract the url, name and image, then render
    for (let album of albums) {
      let albumUrl = album.href
      let albumName = album.name
      let albumImageUrl = album.images ? album.images[0].url : ''

      console.log(albumUrl, albumName, albumImageUrl);

      renderAlbum(albumUrl, albumName, albumImageUrl)
    }
  }

  // add an album to the result UL
  function renderAlbum(albumUrl, albumName, albumImageUrl) {
    let ul = $('ul.results')

    let li = $('<li>').append(`<a href="${albumUrl}">
          <img src="${albumImageUrl}">
          <p class='caption'>${albumName}</p>
        </a>`)
    ul.append(li)
  }

  $("form").trigger("submit"); // auto trigger form for TESTING ONLY
});
