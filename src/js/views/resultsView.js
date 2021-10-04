import View from './view.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'Sorry, your query returned no search results!';
  _message = '';

  _generateMarkUp() {
    return this._data.map(item => {
      return `<li class="preview">
          <a class="preview__link" href="#${item.id}">
            <figure class="preview__fig">
              <img src="${item.image}" alt="Test" class="recipe__img"  crossOrigin="anonymous"/>
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${item.title}</h4>
              <p class="preview__publisher">${item.publisher}</p>
            </div>
          </a>
        </li>`;
    });
  }
}

export default new ResultsView();
