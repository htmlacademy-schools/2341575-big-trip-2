import { generatePoint } from '../fish/point.js';
import { POINTS_COUNT } from '../fish/constants.js';

export default class PointsModel{
  constructor (){
    this.points = Array.from({length: POINTS_COUNT}, generatePoint);
  }

  getPoints () { return this.points;}
}
