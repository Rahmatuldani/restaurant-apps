import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContract';
import FavoriteRestaurant from '../src/scripts/data/favoriteRestaurant';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
    afterEach(async () => {
        (await FavoriteRestaurant.getAll()).forEach(async (restaurant) => {
            await FavoriteRestaurant.deleteRestaurant(restaurant.id);
        });
    });

    itActsAsFavoriteRestaurantModel(FavoriteRestaurant);
});
