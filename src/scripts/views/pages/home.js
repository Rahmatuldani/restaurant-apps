import RestaurantView from './restaurant/restaurant-view';
import RestaurantSource from '../../data/restaurantSource';
import RestaurantShow from './restaurant/restaurant-show';
import RestaurantSearch from './restaurant/restaurant-search';

const view = new RestaurantView();

const Home = {
    async render() {
        return view.getTemplate('Explore Restaurants');
    },

    async afterRender() {
        new RestaurantShow({ view, restaurants: RestaurantSource });
        new RestaurantSearch({ view, restaurants: RestaurantSource });
    },
};

export default Home;
