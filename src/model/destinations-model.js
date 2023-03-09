import { generateDestination } from '../fish/destination';
import { DESTINATIONS } from '../fish/constants.js';

export default class DestinationsModel{
  constructor (){
    this.destinations = Array.from({length: DESTINATIONS.length},(value, index) => generateDestination(index));
  }

  getDestinations () {return this.destinations;}
}
