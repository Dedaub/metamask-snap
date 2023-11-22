import { InsightsInner } from './InsightsInner';
import { ParsedTransaction } from './ParsedTransaction';

export type SnapSimulateResponse = {
  /**
   *
   * @type {ParsedTransaction}
   * @memberof SnapSimulateResponse
   */
  simulate: ParsedTransaction;
  /**
   *
   * @type {string}
   * @memberof SnapSimulateResponse
   */
  verdict?: string;
  /**
   *
   * @type {Array<InsightsInner>}
   * @memberof SnapSimulateResponse
   */
  insights: InsightsInner[];
};
