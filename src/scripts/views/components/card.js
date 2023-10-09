import CONFIG from '../../global/config';

const textSplit = (text) => {
    const maxLength = 100;
    let result = '';
    if (text === undefined) {
        return text;
    }
    if (text.length > maxLength) {
        result = `${text.substring(0, maxLength)}...`;
    }
    return result;
};

const Card = (data = {}) => {
    const element = document.createElement('div');
    element.className = 'card';
    element.innerHTML = `
    <div class="card-image">
      <picture>
        <source 
          type="image/png" 
          media="(min-width: 600px)" 
          width="100%" 
          class="lazyload"
          data-srcset="${CONFIG.BASE_IMAGE_URL_MEDIUM + data.pictureId || 'https://picsum.photos/id/666/800/450?grayscale'}"
        />
        <img width="100%" class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL_SMALL + data.pictureId || 'https://picsum.photos/id/666/800/450?grayscale'}" alt="${data.name || 'card-image'}">
      </picture>
    </div>
    <div class="card-badge">${data.city || 'Unknown'} City</div>
    <div class="card-body">
      <div class="card-rating">Rating : ${data.rating || '0'}</div>
      <div class="card-title">
        <a href="/#/detail/${data.id}" rel="noreferrer">${data.name || 'Card Title'}</a>
      </div>
      <div class="card-text">${textSplit(data.description) || 'Card Text'}</div>
    </div>
  `;
    return element;
};

export default Card;
