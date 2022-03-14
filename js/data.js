/* exported data */
var data = {
  view: 'search-page',
  favorites: [],
  currentRecipe: null,
  editing: null,
  favToDelete: null
};

var previousdataJSON = localStorage.getItem('ajax-yumz-project');

if (previousdataJSON !== null) {

  data = JSON.parse(previousdataJSON);
}

function before(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('ajax-yumz-project', dataJSON);
}

window.addEventListener('beforeunload', before);
