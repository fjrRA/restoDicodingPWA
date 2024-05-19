import CONFIG from '../../globals/config';

const createRestoDetailTemplate = (restaurant) => `
<div id="contentdetail" class="resto__detail">
  <div class="resto__info__detail">
    <h2 class="detail_title">${restaurant.name}</h2>
    <img class="image_detail" crossorigin="anonymous" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" title="${restaurant.name}" />
    <div class="detail_list">
      <h4>City</h4>
      <p class="detail_city">${restaurant.city}</p>
      <h4>Address</h4>
      <p class="detail_address">${restaurant.address}</p>
      <h4>Rating</h4>
      <p class="detail_rate">${restaurant.rating}</p>
      <h4>Description</h4>
      <p class="detail_desc">${restaurant.description}</p>
    </div>
  </div>
  <div class="menuContainer">
    <div class="foodMenu">
      <h3 class="InfoFood">Daftar Panganan:</h3>
      <ul>
        ${restaurant.menus.foods.map((menu) => `<li>${menu.name}</li>`).join('')}
      </ul>
    </div>
    <div class="drinkMenu">
      <h3 class="InfoDrinks">Daftar Minuman:</h3>
      <ul>
        ${restaurant.menus.drinks.map((menu) => `<li>${menu.name}</li>`).join('')}
      </ul>
    </div>
  </div>

  <div class="reviewCust">
    <h2 class="headerInformation">Ulasan</h2>
    <div class="customerReviews">
      ${restaurant.customerReviews.map((review) => `
      <div class="customerReview">
        <p class="custName">${review.name},</p>
        <p class="custReview">"${review.review}"</p>
        <p class="custDate">${review.date}</p>
      </div>`).join('')}
    </div>
  </div>
</div>
`;

const createRestoItemTemplate = (restaurant) => `

  <div class="card" tabindex="0">
    <a href="/#/detail/${restaurant.id}">
      <div class="label__place" tabindex="0"> ${restaurant.city} </div>
      <div class="gambarcontent">
        <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" title="${restaurant.name}" crossorigin="anonymous"/>
      </div>
    

    <div class="content">
      <h3 tabindex="0">Rating
        ${restaurant.rating}
      </h3>
      <h2 tabindex="0">${restaurant.name}</h2>
      <p tabindex="0">${restaurant.description.slice(0, 150)}...</p>
    </div>
    </a>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestoDetailTemplate,
  createRestoItemTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate
};
