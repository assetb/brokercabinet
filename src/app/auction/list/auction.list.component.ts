import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDatepickerInputEvent, MatPaginator} from '@angular/material';
import {AuctionDataSource} from '../auction.datasource';
import {tap} from 'rxjs/operators';
import {ContextService} from '../../shared/context.service';
import {
  AuctionSearchModel, createAuctionSearchModel, loadAuctionSearchModel,
  saveAuctionSearchModel
} from '../../shared/models/auction.search.model';
import {CustomerModel} from '../../shared/models/customer.model';
import {TraderModel} from '../../shared/models/trader.model';
import {BrokerModel} from '../../shared/models/broker.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AuctionModel} from '../../shared/models/auction.model';
import {Router} from '@angular/router';
import {ApiService} from '../../shared/api.service';
import {BaseComponent} from '../../shared/base.component';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction.list.component.html',
  styleUrls: ['./auction.list.component.css']
})
export class AuctionListComponent extends BaseComponent implements OnInit, AfterViewInit {
  private customersSubject = new BehaviorSubject<CustomerModel[]>([]);
  private tradersSubject = new BehaviorSubject<TraderModel[]>([]);
  private brokersSubject = new BehaviorSubject<BrokerModel[]>([]);

  public form: AuctionSearchModel = createAuctionSearchModel();
  public dataSource: AuctionDataSource;
  public customers = this.customersSubject.asObservable();
  public traders = this.tradersSubject.asObservable();
  public brokers = this.brokersSubject.asObservable();

  displayedColumns: string[] = ['number', 'date', 'status', 'trader', 'customer', 'broker', 'site'];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(context: ContextService,
              private apiService: ApiService,
              private router: Router) {
    super(context);
    this.form.StartDate.setDate(this.form.StartDate.getDate() - 3);
    this.form.EndDate.setDate(this.form.EndDate.getDate() + 3);
  }

  selectRow(row: AuctionModel) {
    this.router.navigate(['main', 'auction', row.Id]);
  }

  ngOnInit() {
    this.form = loadAuctionSearchModel();
    this.update();
    this.dataSource = new AuctionDataSource(this.apiService);
    this.search();
  }

  loadCustomers() {
    this.apiService.getCustomers()
      .subscribe(customers =>
        this.customersSubject.next(customers));
  }

  loadTraders() {
    this.apiService.getTraders()
      .subscribe(traders =>
        this.tradersSubject.next(traders));
  }

  loadBrokers() {
    this.apiService.getBrokers()
      .subscribe(brokers =>
        this.brokersSubject.next(brokers));
  }

  update() {
    this.loadCustomers();
    this.loadTraders();
    this.loadBrokers();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.search())
      ).subscribe();
  }

  onDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    switch (type) {
      case 'StartDate':
        this.form.StartDate = event.value;
        break;
      case 'EndDate' :
        this.form.EndDate = event.value;
        break;
    }
    this.search();
  }

  searchKeyUp() {
    this.search();
  }

  search() {
    this.form.PageNumber = this.paginator.pageIndex;
    this.form.PageSize = this.paginator.pageSize ? this.paginator.pageSize : 10;
    this.dataSource.search(this.form);
    saveAuctionSearchModel(this.form);
  }
}
