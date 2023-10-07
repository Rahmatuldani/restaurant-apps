import FavoriteRestaurant from '../../data/favoriteRestaurant';

const LikeButton = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    if (restaurant.data === undefined) {
      this._restaurant = restaurant;
    } else {
      this._restaurant = restaurant.data;
    }
    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurant.getRestaurant(id);
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = `
            <button aria-label="like this restaurant" id="likeButton" class="like">
                <i class="fa-regular fa-heart" aria-hidden="true"></i>
            </button>
        `;

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurant.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = `
            <button aria-label="unlike this restaurant" id="likeButton" class="like">
                <i class="fa-solid fa-heart" aria-hidden="true"></i>
            </button>
        `;

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      console.log(this._restaurant.id);
      await FavoriteRestaurant.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default LikeButton;
