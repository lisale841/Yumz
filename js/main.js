var $searchInput = document.getElementById('search-text');
var $submitButton = document.querySelector('.submit-btn');
var $cardContainer = document.querySelector('.card-container');
var $recipeIngredients = document.getElementById('recipe-ingredients');
var $recipeInstructions = document.getElementById('recipe-instructions');
var $recipeTitle = document.querySelector('.recipe-details-title');
var $recipeImage = document.querySelector('.recipe-details-photo');
var $logo = document.querySelector('.logo');
var $view = document.querySelectorAll('.view');

function homePage(event) {

  swapView(event);

  $searchInput.value = '';

}

$logo.addEventListener('click', homePage);

function submitInput(event) {
  deleteLi($cardContainer);

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

  swapView(event);
}

$submitButton.addEventListener('click', submitInput);

function dataEntry(name, image, id) {
  var $recipeList = document.createElement('div');
  $recipeList.setAttribute('class', 'recipe-list');
  $recipeList.setAttribute('data-id', id);
  $recipeList.setAttribute('data-view', 'recipe-details');

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

  deleteLi($recipeIngredients);
  deleteLi($recipeInstructions);

  $recipeImage.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAQlBMVEX///+hoaGenp6ampr39/fHx8fOzs7j4+P8/Pyvr6/d3d3FxcX29va6urqYmJjs7OzU1NSlpaW1tbWtra3n5+e/v78TS0zBAAACkUlEQVR4nO3b63KCMBCGYUwUUVEO6v3fagWVY4LYZMbZnff51xaZ5jON7CZNEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQb5tvI8qzX4/nH84XG5Upfj2ir2V2E5fZ/XpIX9saMnhkYLIkiyRJjdgMoiEDMmiQgfwM8rSu77ew2wnPoLTmwdZBs0J2BuXrYckcQm4nOoP+WcmWAbcTnUHZPy9eA24nOoN7n0HI54ToDM5k8PjluwyqgNuJzqDoaugPg8gWZ4noDAYLwuIg75fLeeHHsjNIzrZJwWwW+0DNsmEWPjiEZ5AcD8ZUu8VZ8HyQMifvBdIz+PS33i8adu+7Qn4Gn1Tdupl7rlCfQb9seosK7RkcBy1o30iVZ5CPOtDW3WhQnsF13IV3v0p3BqfJRoSpXVepzmA/24+yqeMyzRm4tqOs44lSUwa3yfgOri25av5CPRnklR33VlPnrqSZV09qMsiqSWV082xOz1uPajJ49pTM/f115k6guWa6JGjJ4N1lt8fXN2rv/vysjFaSQdFXBc/KKF04ptFPliclGVR9Bu27XCyeVOkmy5OODAZN9rYyyip/AIPJ8qIig+PoXbf7YdPdncFoSdCQQT4ZceV+MhiFMBy0hgyu0yGvOLI17KwpyGBaHK5jtt0N5GcwLw7XZdB31sRn8O+ziqYro8Vn4CwOV+k6a9Iz+PwRsKC7h+gMfMXhKu/OmuwM/MXhKq8yWnYG/uJw5Uxoy2jRGZTBZ/jboxuSM1guDtdNhKazJjiDbNMe0AxzKUVnkO+jEJxBxNtJzWCTxlNLzSB8KehJ/H+mJGYAjaDjzj9SnHZRuXZiAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECXP1XDHv7U4SNFAAAAAElFTkSuQmCC');
  $recipeTitle.textContent = '';

  var detailedId = event.currentTarget.dataset.id;

  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://tasty.p.rapidapi.com/recipes/detail?id=' + detailedId);
  xhr.setRequestHeader('x-rapidapi-host', 'tasty.p.rapidapi.com');
  xhr.setRequestHeader('x-rapidapi-key', 'fc76fe0d21mshcb71b3e0899c0c9p1ba386jsn57a74a4f882a');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    $recipeTitle.textContent = xhr.response.name;
    $recipeImage.setAttribute('src', xhr.response.thumbnail_url);

    for (var i = 0; i <= xhr.response.sections[0].components.length - 1; i++) {
      var $li = document.createElement('li');
      $li.textContent = xhr.response.sections[0].components[i].raw_text;
      $recipeIngredients.appendChild($li);
    }
    for (var k = 0; k <= xhr.response.instructions.length - 1; k++) {
      var $instructions = document.createElement('li');
      $instructions.textContent = xhr.response.instructions[k].display_text;
      $recipeInstructions.appendChild($instructions);
    }

  });
  xhr.send();

  swapView(event);
}

function deleteLi(elementParent) {
  while (elementParent.firstChild) {
    elementParent.removeChild(elementParent.firstChild);
  }
}

function swapView(event) {
  var viewer;
  if (event) {
    viewer = event.currentTarget.getAttribute('data-view');
  }

  if (viewer) {
    for (var i = 0; i < $view.length; i++) {
      if ($view[i].getAttribute('data-view') === viewer) {
        $view[i].className = 'view';

      } else {
        $view[i].className = 'view hidden';
      }

    }
  }
}
