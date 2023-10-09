import RestaurantSource from '../../data/restaurantSource';
import CONFIG from '../../global/config';
import UrlParser from '../../router/url-parser';
import Alert from '../components/alert';
import LikeButton from '../components/likeButton';

const renderDetail = (restaurant) => `
    <div class="section-header" tabindex="0">Detail</div>
    <div id="poster">
        <picture>
            <source 
            type="image/png" 
            media="(min-width: 600px)" 
            width="100%" 
            srcset="${CONFIG.BASE_IMAGE_URL_MEDIUM + restaurant.pictureId || 'https://picsum.photos/id/666/800/450?grayscale'}"
            />
            <img width="100%" src="${CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId || 'https://picsum.photos/id/666/800/450?grayscale'}" alt="${restaurant.name || 'card-image'}">
        </picture>
    </div>
    <div id="content">
        <p class="restaurant-name" tabindex="0">${restaurant.name}</p>
        <p tabindex="0"><strong>Adress : </strong>${restaurant.address}, ${restaurant.city}</p>
        <p tabindex="0"><strong>Rating : </strong>${restaurant.rating}</p>
        <p tabindex="0"><strong>Category : </strong>${restaurant.categories.map((category) => category.name).join(', ')}</p>
        <p tabindex="0"><strong>Description : </strong>${restaurant.description}</p>
    </div>
`;

const renderMenus = (menus) => {
    const foods = menus.foods.map((food) => `<li tabindex="0">${food.name}</li>`).join('');
    const drinks = menus.drinks.map((drink) => `<li tabindex="0">${drink.name}</li>`).join('');

    return `
        <div class="section-header" tabindex="0">Menus</div>
        <div id="foods">
            <p tabindex="0">Foods</p>
            <ul>${foods}</ul>    
        </div>
        <div id="drinks" tabindex="0">
            <p tabindex="0">Drinks</p>
            <ul>${drinks}</ul>    
        </div>
    `;
};

const renderReviews = (customerReviews) => {
    const reviews = customerReviews.map((review) => `
    <div class="reviews">
        <div class="customerName" tabindex="0">Name : ${review.name}</div>
        <div class="reviewDate" tabindex="0">Date : ${review.date}</div>
        <div class="customerReview" tabindex="0">Review : ${review.review}</div>
    </div>
  `).join('');

    return `
    <div class="section-header" tabindex="0">Reviews</div>
    <form id="reviewForm">
        <label for="inputName">Name: </label>
        <input type="text" id="inputName" placeholder="Input Name" aria-label="input your name for your review" required/>
        <label for="inputReview">Review: </label>
        <textarea id="inputReview" placeholder="Input Review" aria-label="input your review for the restaurant" required></textarea>
        <button type="submit" class="btn-submit" aria-label="submit your review">Submit</button>
    </form>
    <hr>
    ${reviews}
  `;
};

const Detail = {
    async render() {
        return `
        <div class="detail-content">
            <section id="detail"></section>
            <section id="menus"></section>
            <section id="reviews"></section>
            <div id="likeButtonContainer"></div>
        </div>
    `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const restaurant = await RestaurantSource.detailRestaurant(url.id);

        LikeButton.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            restaurant,
        });

        const detail = document.querySelector('#detail');
        detail.innerHTML = renderDetail(restaurant.data);

        const menus = document.querySelector('#menus');
        menus.innerHTML = renderMenus(restaurant.data.menus);

        const reviews = document.querySelector('#reviews');
        reviews.innerHTML = renderReviews(restaurant.data.customerReviews);

        const form = document.querySelector('#reviewForm');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.querySelector('#inputName');
            const review = document.querySelector('#inputReview');
            const body = {
                id: restaurant.data.id,
                name: name.value,
                review: review.value,
            };

            const newReview = await RestaurantSource.addReview(body);
            if (newReview.code === 'error') {
                Alert(newReview.data);
            } else {
                reviews.innerHTML = renderReviews(newReview.data);
            }
        });
    },
};

export default Detail;
