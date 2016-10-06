$(document).ready(function(){
  loadJoke();
  $('form').on('submit', function(e) {
    e.preventDefault();
    hideAndStoreJoke();
    loadJoke();
  })
})

function loadJoke() {
    var fName = $("#firstName").val();
    var lName = $("#lastName").val();

    (fName === "") ? fName = "Chuck": fName = fName;
    (lName === "") ? lName = "Norris" : lName = lName; 

    var options = {
      url: 'http://api.icndb.com/jokes/random',
      data: {
          firstName : fName,
          lastName : lName
      }
    }
    var result = $.ajax(options)
    result.done(function(object) {
      var jokeText = object.value.joke;
      var $jokeList = $("<li />").html(jokeText);
      $('ul.jokes').append($jokeList);
    })
    result.fail(function(jqx, status, errorThrown) {
      console.log(status, errorThrown);
    })
}

function hideAndStoreJoke() {
  var lastJoke = $('li').html();
  var newLastJoke = $("<li />").html(lastJoke);
  $('ul.previousJokes').prepend(newLastJoke);
  $('ul.jokes').empty();
}
