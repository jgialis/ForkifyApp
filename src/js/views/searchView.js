class SearchView {
  _parentElement = document.querySelector('.search');
  getQuery() {
    return this._parentElement.querySelector('.search__field').value;
  }

  // Publisher
  addHandlerSearch(handler) {
    // Subscriber
    this._parentElement.addEventListener('submit', handler);
  }
}

export default new SearchView();

// const query = this._parentElement.querySelector('.search__field').value;
// this._parentElement.querySelector('.search__field').value = 'FIX LATER';
// this._parentElement.querySelector('.search__field').blur();
// return query;
