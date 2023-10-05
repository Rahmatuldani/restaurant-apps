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
          srcset="${data.picture || 'https://picsum.photos/id/666/800/450?grayscale'}"
        />
        <img width="100%" src="${data.picture || 'https://picsum.photos/id/666/800/450?grayscale'}" alt="${data.name || 'card-image'}">
      </picture>
    </div>
    <div class="card-badge">${data.city || 'Unknown'} City</div>
    <div class="card-body">
      <div class="card-rating">Rating : ${data.rating || '0'}</div>
      <div class="card-title">
        <a href="#!">${data.name || 'Card Title'}</a>
      </div>
      <div class="card-text">${data.description || 'Card Text'}</div>
    </div>
  `;
  return element;
};

export default Card;
