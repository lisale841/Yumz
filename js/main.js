var $searchInput = document.getElementById('search-text');
var $submitButton = document.querySelector('.submit-btn');
var $headingBackground = document.querySelector('.heading-background');
var $cardContainer = document.querySelector('.card-container');
var $recipeView = document.querySelector('.recipe-view');

function submitInput(event) {

  var inputValue = $searchInput.value;

  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=' + inputValue);

  xhr.setRequestHeader('x-rapidapi-host', 'tasty.p.rapidapi.com');
  xhr.setRequestHeader('x-rapidapi-key', 'fc76fe0d21mshcb71b3e0899c0c9p1ba386jsn57a74a4f882a');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    for (var i = 0; i <= xhr.response.results.length - 1; i++) {
      var responseName = xhr.response.results[i].name;
      var imageUrl = xhr.response.results[i].thumbnail_url;
      var id = xhr.response.results[i].id;
      var entry = dataEntry(responseName, imageUrl, id);
      entry.addEventListener('click', getRecipe);
      $cardContainer.appendChild(entry);
    }

  });

  xhr.send();
  $headingBackground.setAttribute('class', 'heading-background hidden');
  $recipeView.setAttribute('class', 'recipe-view');

}

$submitButton.addEventListener('click', submitInput);

function dataEntry(name, image, id) {
  var $recipeList = document.createElement('div');
  $recipeList.setAttribute('class', 'recipe-list');
  $recipeList.setAttribute('data-id', id);

  var $recipePhoto = document.createElement('div');
  $recipePhoto.setAttribute('class', 'recipe-photo');
  $recipeList.appendChild($recipePhoto);

  var $recipeImage = document.createElement('img');
  $recipeImage.setAttribute('src', image);
  $recipeImage.setAttribute('class', 'image-recipe');
  $recipePhoto.appendChild($recipeImage);

  var $recipeTitle = document.createElement('div');
  $recipeTitle.setAttribute('class', 'recipe-title');
  $recipeList.appendChild($recipeTitle);

  var $recipePara = document.createElement('p');
  $recipePara.setAttribute('class', 'recipe-para');
  $recipePara.textContent = name;
  $recipeTitle.appendChild($recipePara);

  return $recipeList;
}

function getRecipe(event) {
  var detailedId = event.target.dataset.id;

  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://tasty.p.rapidapi.com/recipes/detail?id=' + detailedId);
  xhr.setRequestHeader('x-rapidapi-host', 'tasty.p.rapidapi.com');
  xhr.setRequestHeader('x-rapidapi-key', 'fc76fe0d21mshcb71b3e0899c0c9p1ba386jsn57a74a4f882a');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

  });
  xhr.send();
}
