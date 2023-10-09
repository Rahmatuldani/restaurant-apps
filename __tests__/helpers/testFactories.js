import LikeButton from '../../src/scripts/views/components/likeButton';

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
    await LikeButton.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant,
    });
};

export { createLikeButtonPresenterWithRestaurant };
