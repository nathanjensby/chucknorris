$(document).ready(function(){
  $('form').on('submit', loadJoke)

})

function loadJoke(e) {
    e.preventDefault();

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
