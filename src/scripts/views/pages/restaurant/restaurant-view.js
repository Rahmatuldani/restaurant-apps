import Card from '../../components/card';

class RestaurantView {
    getTemplate(title) {
        return `
      <div class="content">
        <h3 class="content__heading" tabindex="0">${title}</h3>
        <input type="text" id="query" placeholder="Search restaurant" aria-label="input restaurant name"/>
        <div id="restaurants" class="restaurants">
          <div class="loading">
            Memuat ...
          </div>
        </div>
      </div>
    `;
    }

    showRestaurants(restaurants) {
        const content = document.querySelector('#restaurants');
        content.innerHTML = '';

        restaurants.forEach((restaurant) => {
            content.appendChild(Card(restaurant));
        });

        content.dispatchEvent(new Event('restaurants:updated'));
    }

    runWhenUserIsSearching(callback) {
        document.getElementById('query').addEventListener('keyup', (event) => {
            callback(event.target.value);
        });
    }

    _getEmptyTemplate() {
        const content = document.querySelector('#restaurants');
        content.innerHTML = `
        <div class="restaurant-item__not__found">
            <p tabindex="0">There is no restaurant found</p>
        </div>
    `;

        content.dispatchEvent(new Event('restaurants:updated'));
    }
}

export default RestaurantView;
