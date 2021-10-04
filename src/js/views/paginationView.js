import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkUp() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // If we are on the first page, and there is more than 1 page
    if (this._data.page === 1 && numPages > 1)
      return `
        <button data-goto ="${
          this._data.page + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;

    // If we are on the last, or only page
    if (this._data.page === numPages && numPages > 1)
      return `
      <button data-goto="${
        this._data.page - 1
      }"" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>`;

    // If we are on some other page
    if (this._data.page > 1)
      return `<button data-goto="${
        this._data.page - 1
      }"" class="btn--inline pagination__btn--prev" >
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${this._data.page - 1}</span>
              </button>
              <button data-goto="${
                this._data.page + 1
              }" class="btn--inline pagination__btn--next ">
                  <span>Page ${this._data.page + 1}</span>
                  <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                  </svg>
              </button>`;

    // You are on the only page
    return '';
  }
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }
}

export default new PaginationView();
