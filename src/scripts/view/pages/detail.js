import { createRestoDetailTemplate, createLikeButtonTemplate } from '../templates/template-creator';
import RestaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import CONFIG from '../../globals/config';

const Detail = {
  async render() {
    return `
      <div id="contentdetail" class="resto__detail"></div>
      <div id="likeButtonContainer"></div>

      <div id="addNoteFormContainer" class="add-note-form-container">
        <h2 class="title__review">Tambahkan Review Anda</h2>
          <form id="addNoteForm" class="add-note-form">
            <div class="form-group">
              <label for="newNoteName">Nama</label>
              <input
                id="newNoteName"
                name="newNoteName"
                type="text"
                required
              />
              <span
                id="noteNameValidation"
                class="validation-message"
                style="display: block"
              ></span>
            </div>

            <div class="form-group">
              <label for="newNoteDescription">Deskripsi Ulasan</label>
              <textarea
                id="newNoteDescription"
                name="newNoteDescription"
                rows="15"
                required
              ></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
      </div>
     
    `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detail = await RestaurantSource.restaurantDetail(url.id);
    const restaurantItem = document.querySelector('#contentdetail');
    restaurantItem.innerHTML = createRestoDetailTemplate(detail.restaurant);

    const likeButtonContainer = document.querySelector('#likeButtonContainer');
    likeButtonContainer.innerHTML = createLikeButtonTemplate();
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: detail.restaurant.id,
        name: detail.restaurant.name,
        description: detail.restaurant.description,
        backdrop_path: CONFIG.BASE_IMAGE_URL,
        pictureId: detail.restaurant.pictureId,
        rating: detail.restaurant.rating,
        city: detail.restaurant.city,
      },
    });

    const reviewForm = document.getElementById('addNoteForm');

    const updateCustomerReviews = (reviews) => {
      const customerReviewsContainer = document.querySelector('.customerReviews');
      customerReviewsContainer.innerHTML = reviews.map((review) => `
        <div class="customerReview">
          <p class="custReview">"${review.review}"</p>
          <p class="custName">${review.name},</p>
          <p class="custDate">${review.date}</p>
        </div>`).join('');
    };

    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const reviewName = document.getElementById('newNoteName').value;
      const reviewText = document.getElementById('newNoteDescription').value;

      const response = await fetch('https://restaurant-api.dicoding.dev/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: detail.restaurant.id, name: reviewName, review: reviewText }),

      });

      if (response.ok) {
        const newReview = { name: reviewName, review: reviewText, date: new Date().toLocaleDateString('en-US') };
        detail.restaurant.customerReviews.push(newReview);
        updateCustomerReviews(detail.restaurant.customerReviews);
        reviewForm.reset();
      } else {
        alert('Failed to add review. Please try again.');
      }
    });

    const updateReviews = async () => {
      const response = await fetch(`https://restaurant-api.dicoding.dev/review?id=${detail.restaurant.id}`);
      if (response.ok) {
        const reviewResponse = await response.json();
        detail.restaurant.customerReviews = reviewResponse.customerReviews;
        updateCustomerReviews(detail.restaurant.customerReviews);
      }
    };

    await updateReviews();
  },
}

export default Detail;