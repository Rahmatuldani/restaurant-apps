import Card from '../../components/card';

class RestaurantView {
  constructor() {
    this._content = document.createElement('div');
    this._content.className = 'content';
  }

  getTemplate() {
    this._content.innerHTML = `
          <h3 class="content__heading">Explore Restaurant</h3>
          <input type="text" id="query" placeholder="Search restaurant"/>
          <div id="restaurants" class="restaurants">
            <div class="loading">
              Memuat ...
            </div>
          </div>
        `;
    return this._content;
  }

  showRestaurants(restaurants) {
    const content = document.querySelector('#restaurants');
    content.innerHTML = '';

    restaurants.forEach((restaurant) => {
      content.appendChild(Card(restaurant));
    });

    content.dispatchEvent(new Event('restaurants:update'));
  }

  runWhenUserIsSearching(callback) {
    document.querySelector('#query').addEventListener('keyup', (event) => {
      callback(event.target.value);
    });
  }

  _getEmptyTemplate() {
    const content = document.querySelector('#restaurants');
    content.innerHTML = `
        <div class="restaurant-item__not__found">
            Tidak ada restaurant untuk ditampilkan
        </div>
    `;

    content.dispatchEvent(new Event('restaurants:update'));
  }
}

export default RestaurantView;
