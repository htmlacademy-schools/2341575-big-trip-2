import { createElement } from '../render.js';
import { humanizePointDay, humanizePointTime, getEventDuration } from '../utils.js';
import { getOffersByType } from '../fish/offers.js';
import OffersView from './offers-view.js';

const getOffers = (selectedItems, allItems) => {
  if (allItems.length === 0){
    return '';
  }

  let offers = '';

  allItems.forEach((item) => {
    if (selectedItems.find((offer) => offer.id === item.id)){
      offers += `<li class="event__offer">
      <span class="event__offer-title">${item.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.price}</span>
    </li>`;
    }
  });

  return new OffersView(offers).getTemplate();
};

const createPointTemplate = (point, availableDestinations) => {
  const {basePrice, dateFrom, dateTo, destination, isFavourite, offers, type} = point;

  const hasStar = isFavourite? 'event__favorite-btn--active' : '';

  const allOffers = getOffers(offers.offers, getOffersByType(type));

  const humanizedDate = humanizePointDay(dateFrom);
  const timeFrom = humanizePointTime(dateFrom);
  const timeTo = humanizePointTime(dateTo);

  const duration = getEventDuration(dateFrom, dateTo);
  const currentDestination = availableDestinations.find((item) => item.id === destination);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime=${dateFrom}>${humanizedDate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${currentDestination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${dateFrom}>${timeFrom}</time>
        &mdash;
        <time class="event__end-time" datetime=${dateTo}>${timeTo}</time>
      </p>
      <p class="event__duration">${duration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    ${allOffers}
    <button class="event__favorite-btn ${hasStar}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`);
};

export default class PointView {
  constructor(point, allDestinations){
    this.point = point;
    this.allDestinations = allDestinations;
  }

  getTemplate () {
    return createPointTemplate(this.point, this.allDestinations);
  }

  getElement() {
    if (!this.element){
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
