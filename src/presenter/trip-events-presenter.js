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

  init (tripContainer, pointsModel, editingFormModel, destinationsModel) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
    this.points = [...this.pointsModel.getPoints()];
    this.destinations = destinationsModel.getDestinations();

    render(new SortingView(), this.tripContainer);
    render(this.eventsList, this.tripContainer);
    render(new EditingFormView(editingFormModel.getForm(), this.destinations),
      this.eventsList.getElement());

    for (let i = 0; i < this.points.length; i++){
      render(new PointView(this.points[i], this.destinations), this.eventsList.getElement());
    }

    render(new NewFormView(this.destinations), this.eventsList.getElement());
  }
}
