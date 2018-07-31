import {CompanyDetailsModel} from './company.details.model';

export interface CustomerDetailsModel {
  Id: number;
  CompanyId: number;
  Company: CompanyDetailsModel;
}
