import { time } from 'console';
import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {

    // Calculate the price of trade, ratio, upperbound, lowerbound
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price)/2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price)/2;
    const ratio = priceABC / priceDEF;
    const upperBound = 1 + 0.05;
    const lowerBound = 1 - 0.05;

    const timestamp = serverRespond[0].timestamp > serverRespond[1].timestamp ? serverRespond[0].timestamp : serverRespond[1].timestamp;

    const trigger_alert = (ratio > upperBound || ratio < lowerBound) ? ratio : undefined;

    return {
        price_abc: priceABC,
        price_def: priceDEF,
        ratio: ratio,
        timestamp: timestamp,
        upper_bound: upperBound,
        lower_bound: lowerBound,
        trigger_alert: trigger_alert,
      };

    }
  }
