import { IOffer } from './offer.interface';

export interface IOfferColection {
  offers: IOffer[];
  totalCount: number;
  page: number;
  totalPages: number;
}
