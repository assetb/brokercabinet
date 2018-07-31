import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuctionDetailsModel} from '../../shared/models/auction.details.model';
import {ActivatedRoute} from '@angular/router';
import {ContextService} from '../../shared/context.service';
import {BaseComponent} from '../../shared/base.component';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CustomerModel} from '../../shared/models/customer.model';
import {ApiService} from '../../shared/api.service';
import {TraderModel} from '../../shared/models/trader.model';
import {RegulationModel} from '../../shared/models/regulation.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction.details.component.html',
  styleUrls: ['./auction.details.component.css']
})
export class AuctionDetailsComponent extends BaseComponent implements OnInit, OnDestroy {
  public auctionId: number;
  public auction: Observable<AuctionDetailsModel>;
  private customersSubject = new BehaviorSubject<CustomerModel[]>([]);
  public customers = this.customersSubject.asObservable();
  private tradersSubject = new BehaviorSubject<TraderModel[]>([]);
  public traders = this.tradersSubject.asObservable();
  private regulationSubject = new BehaviorSubject<RegulationModel>({} as RegulationModel);
  public regulation = this.regulationSubject.asObservable();

  constructor(protected context: ContextService,
              private apiService: ApiService,
              private route: ActivatedRoute) {
    super(context);
    this.auctionId = +this.route.snapshot.paramMap.get('id');
    this.auction = this.apiService.getAuctionDetails(this.auctionId);
  }

  onDateChange() {
    // console.log(this.auction.Date);
  }

  getAuctionDetails() {
    this.auction.subscribe();
  }

  getRegulation() {
    this.apiService.getRegulation(this.auctionId)
      .subscribe(regulation =>
        this.regulationSubject.next(regulation));
  }

  getTraders() {
    this.apiService.getTraders().subscribe(traders =>
      this.tradersSubject.next(traders));
  }

  getCustomers() {
    this.apiService.getCustomers().subscribe(customers =>
      this.customersSubject.next(customers));
  }

  ngOnInit(): void {
    this.getAuctionDetails();
    this.getCustomers();
    this.getTraders();
  }

  ngOnDestroy(): void {
    this.customersSubject.unsubscribe();
    this.tradersSubject.unsubscribe();
    this.regulationSubject.unsubscribe();
  }

}
