import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContract';

let favoriteRestaurants = [];

const FavoriteRestaurantArray = {
    getRestaurant(id) {
        if (!id) {
            return;
        }

        // eslint-disable-next-line consistent-return
        return favoriteRestaurants.find((restaurant) => restaurant.id === id);
    },

    getAll() {
        return favoriteRestaurants;
    },

    putRestaurant(restaurant) {
        // eslint-disable-next-line no-prototype-builtins
        if (!restaurant.hasOwnProperty('id')) {
            return;
        }

        if (this.getRestaurant(restaurant.id)) {
            return;
        }

        favoriteRestaurants.push(restaurant);
    },

    deleteRestaurant(id) {
        favoriteRestaurants = favoriteRestaurants.filter((restaurant) => restaurant.id !== id);
    },

    async searchRestaurants(query) {
        const data = await this.getAll();

        // eslint-disable-next-line max-len
        return data.filter((restaurant) => restaurant.name.toLowerCase().includes(query.toLowerCase()));
    },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
    afterEach(() => {
        favoriteRestaurants = [];
    });

    itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});
