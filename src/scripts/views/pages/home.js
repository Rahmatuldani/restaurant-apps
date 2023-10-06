import RestaurantView from './restaurant/restaurant-view';
import RestaurantSource from '../../data/restaurantSource';
import RestaurantShow from './restaurant/restaurant-show';
import RestaurantSearch from './restaurant/restaurant-search';

const view = new RestaurantView();

const Home = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new RestaurantShow({ view, restaurants: RestaurantSource });
    new RestaurantSearch({ view, restaurants: RestaurantSource });
    // const restaurantsList = document.querySelector('#restaurants');
    // const restaurants = await RestaurantSource.getAll();

    // if (restaurants.code === 'success') {
    //   restaurantsList.innerHTML = '';

    //   restaurants.data.forEach((restaurant) => {
    //     restaurantsList.appendChild(Card(restaurant));
    //   });
    // }

    // const search = document.querySelector('#query');
    // search.addEventListener('keyup', async (event) => {
    //   const searchRestaurants = await RestaurantSource.searchRestaurant(event.target.value);
    //   restaurantsList.innerHTML = '';
    //   searchRestaurants.data.forEach((restaurant) => {
    //     restaurantsList.appendChild(Card(restaurant));
    //   });
    // });
  },
};

export default Home;
