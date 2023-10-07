import RestaurantView from './restaurant/restaurant-view';
import RestaurantShow from './restaurant/restaurant-show';
import RestaurantSearch from './restaurant/restaurant-search';
import FavoriteRestaurant from '../../data/favoriteRestaurant';

const view = new RestaurantView();

const Favorite = {
  async render() {
    return view.getTemplate('Favorite Restaurants');
  },

  async afterRender() {
    new RestaurantShow({ view, restaurants: FavoriteRestaurant });
    new RestaurantSearch({ view, restaurants: FavoriteRestaurant });
  },
};

export default Favorite;
