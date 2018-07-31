import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CustomerModel} from './models/customer.model';
import {TypeModel} from './models/type.model';
import {StatusModel} from './models/status.model';
import {SiteModel} from './models/site.model';
import {SectionModel} from './models/section.model';
import {TraderModel} from './models/trader.model';
import {BrokerModel} from './models/broker.model';
import {AuctionDetailsModel} from './models/auction.details.model';
import {MessageModel} from './models/message.model';
import {AuctionModel} from './models/auction.model';
import {DataSourceModel} from './models/data.source.model';
import {AuctionSearchModel} from './models/auction.search.model';
import {RegulationModel} from './models/regulation.model';
import {LotShortModel} from './models/lot.short.model';
import {SupplierOrderShortModel} from './models/supplier.order.short.model';
import {ApplicantShortModel} from './models/applicant.short.model';
import {ProcuratoryShortModel} from './models/procuratory.short.model';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {
  }

  getProcuratories(auctionId: number, pageNumber: number = 0, pageSize: number = 10): Observable<DataSourceModel<ProcuratoryShortModel>> {
    return this.httpClient.get<DataSourceModel<ProcuratoryShortModel>>('/api/Procuratory', {
      params: new HttpParams()
        .set('auctionId', auctionId.toString())
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    });
  }

  getApplicants(auctionId: number, pageNumber: number = 0, pageSize: number = 10): Observable<DataSourceModel<ApplicantShortModel>> {
    return this.httpClient.get<DataSourceModel<ApplicantShortModel>>('/api/Applicant', {
      params: new HttpParams()
        .set('auctionId', auctionId.toString())
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    });
  }

  getSupplierOrders(auctionId: number, pageNumber: number = 0, pageSize: number = 10): Observable<DataSourceModel<SupplierOrderShortModel>> {
    return this.httpClient.get<DataSourceModel<SupplierOrderShortModel>>('/api/SupplierOrder', {
      params: new HttpParams()
        .set('auctionId', auctionId.toString())
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    });
  }

  getLots(auctionId: number, pageNumber: number = 0, pageSize: number = 10): Observable<DataSourceModel<LotShortModel>> {
    return this.httpClient.get<DataSourceModel<LotShortModel>>('/api/Lot', {
      params: new HttpParams()
        .set('auctionId', auctionId.toString())
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    });
  }

  getAuctions(form: AuctionSearchModel): Observable<DataSourceModel<AuctionModel>> {
    let httpParams = new HttpParams();
    Object.keys(form).forEach(function (key) {
      httpParams = httpParams.append(key, form[key]);
    });

    return this.httpClient.get<DataSourceModel<AuctionModel>>('/api/Auction', {
      params: httpParams
    });
  }

  postLogin(login: string, password: string): Observable<MessageModel> {
    return this.httpClient.post<MessageModel>('/api/Account', {
      Login: login,
      Password: password
    });
  }

  getAuctionDetails(id: number): Observable<AuctionDetailsModel> {
    return this.httpClient.get<AuctionDetailsModel>('/api/Auction/' + id);
  }

  getTraders(): Observable<TraderModel[]> {
    return this.httpClient.get<TraderModel[]>('/api/Trader');
  }

  getBrokers(): Observable<BrokerModel[]> {
    return this.httpClient.get<BrokerModel[]>('/api/Broker');
  }

  getCustomers(): Observable<CustomerModel[]> {
    return this.httpClient.get<CustomerModel[]>('/api/Customer');
  }

  getCustomer(id: number): Observable<CustomerModel> {
    return this.httpClient.get<CustomerModel>('/api/Customer/' + id);
  }

  getTypes(): Observable<TypeModel[]> {
    return this.httpClient.get<TypeModel[]>('/api/Type');
  }

  getSections(): Observable<SectionModel[]> {
    return this.httpClient.get<SectionModel[]>('/api/Section');
  }

  getSites(): Observable<SiteModel[]> {
    return this.httpClient.get<SiteModel[]>('/api/Site');
  }

  getStatuses(): Observable<StatusModel[]> {
    return this.httpClient.get<StatusModel[]>('/api/Status');
  }

  getRoles(): Observable<string[]> {
    return this.httpClient.get<string[]>('/api/Role');
  }

  getRegulation(id: number): Observable<RegulationModel> {
    return this.httpClient.get<RegulationModel>('/api/Regulation/' + id);
  }
}
