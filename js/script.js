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
    var numJokes = $('#numberOfJokes').val();

    (fName === "") ? fName = "Chuck": fName = fName;
    (lName === "") ? lName = "Norris" : lName = lName;

    var options = {
      url: 'http://api.icndb.com/jokes/random/'+numJokes,
      data: {
          firstName : fName,
          lastName : lName
      }
    }
    var result = $.ajax(options)
    result.done(function(object) {
      for (var i = 0; i < object.value.length; i++) {
        var jokeText = object.value[i].joke;
        var $jokeList = $("<li />").html(jokeText).addClass("cJ");
        $('ul.jokes').append($jokeList);

      }
    })
    result.fail(function(jqx, status, errorThrown) {
      console.log(status, errorThrown);
    })
}

function hideAndStoreJoke() {
    var arr = [];
    $('ul.jokes li').each(function() {
      arr.push($(this).html());
      $('ul.jokes li').remove();
    });
    for (var i = 0; i < arr.length; i++) {
      var newLastJoke = $("<li />").html(arr[i]);
      $('ul.previousJokes').prepend(newLastJoke);
    }
    // var lastJoke = $('ul.jokes li').html();
    // var newLastJoke = $("<li />").html(lastJoke);
    // $('ul.previousJokes').prepend(newLastJoke);
    // $('ul.jokes').empty();

}
