$(document).ready(function(){
  $('form').on('submit', function(e) {
    e.preventDefault();
    hideAndStoreJoke();
    loadJoke();
  })
})

function loadJoke(e) {

    console.log("You got a joke");
    var options = {
      url: 'http://api.icndb.com/jokes/random'
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
var previousJokes = [];

function hideAndStoreJoke() {
  var lastJoke = $('li').html();
  console.log(lastJoke);
  previousJokes.push(lastJoke);
  $('ul.jokes').empty();
  if (previousJokes[0] === undefined) {
    previousJokes.shift();
  }
  console.log(previousJokes.length, previousJokes);
}
