var $searchInput = document.getElementById('search-text');
var $submitButton = document.querySelector('.submit-btn');

function submitInput(event) {

  var inputValue = $searchInput.value;

  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=' + inputValue);

  xhr.setRequestHeader('x-rapidapi-host', 'tasty.p.rapidapi.com');
  xhr.setRequestHeader('x-rapidapi-key', '8f721108famsh92bceea2f2d9673p14fc63jsn9e143d1c4aa7');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

  });

  xhr.send();

}

$submitButton.addEventListener('click', submitInput);
