import EventsView from '../view/trip-events-view.js';
import PointView from '../view/point-view.js';
import NewFormView from '../view/new-form-view.js';
import EditingFormView from '../view/editing-form-view.js';
import SortingView from '../view/sorting-view.js';
import { render } from '../render.js';

export default class TripEventsPresenter {
  constructor() {
    this.eventsList = new EventsView();
  }

  init (tripContainer) {
    this.tripContainer = tripContainer;

    render(new SortingView(), this.tripContainer);
    render(this.eventsList, this.tripContainer);
    render(new EditingFormView(), this.eventsList.getElement());

    for (let i = 0; i < 3; i++){
      render(new PointView(), this.eventsList.getElement());
    }

    render(new NewFormView(), this.eventsList.getElement());
  }
}
