import RestaurantShow from '../src/scripts/views/pages/restaurant/restaurant-show';
import RestaurantView from '../src/scripts/views/pages/restaurant/restaurant-view';

describe('Showing all favorite Restaurants', () => {
    let view;

    const renderTemplate = () => {
        view = new RestaurantView();
        document.body.innerHTML = view.getTemplate();
    };

    beforeEach(() => {
        renderTemplate();
    });

    describe('When no restaurants have been liked', () => {
        it('should render the information that no restaurants have been liked', () => {
            const favoriteRestaurants = {
                getAll: jest.fn().mockImplementation(() => []),
            };

            const presenter = new RestaurantShow({
                view,
                restaurants: favoriteRestaurants,
            });

            const restaurants = [];
            presenter._displayRestaurants(restaurants);

            expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
        });

        it('should ask for the favorite restaurants', () => {
            const favoriteRestaurants = {
                getAll: jest.fn().mockImplementation(() => []),
            };

            new RestaurantShow({
                view,
                restaurants: favoriteRestaurants,
            });

            expect(favoriteRestaurants.getAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('When favorite restaurant exist', () => {
        it('shoud show the restaurant', (done) => {
            document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.card').length).toEqual(2);

                done();
            });

            const favoriteRestaurants = {
                getAll: jest.fn().mockImplementation(() => [
                    {
                        id: 11,
                        name: 'A',
                        rating: 3,
                        description: 'Sebuah restoran A',
                    },
                    {
                        id: 22,
                        name: 'B',
                        rating: 4,
                        description: 'Sebuah restoran B',
                    },
                ]),
            };

            new RestaurantShow({
                view,
                restaurants: favoriteRestaurants,
            });
        });
    });
});
