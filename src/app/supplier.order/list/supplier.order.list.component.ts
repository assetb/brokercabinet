import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {MatPaginator} from '@angular/material';
import {SupplierOrderListDatasource} from '../supplier.order.data.source';

@Component({
  selector: 'app-supplier-order-list',
  templateUrl: './supplier.order.list.component.html',
  styleUrls: ['./supplier.order.list.component.css']
})
export class SupplierOrderListComponent implements OnInit {
  @ViewChild(MatPaginator) pagination: MatPaginator;
  dataSource: SupplierOrderListDatasource;
  displayedColumns: string[] = ['supplier', 'status'];

  constructor(private apiService: ApiService) {
  }

  @Input() auctionId: number;

  ngOnInit(): void {
    this.dataSource = new SupplierOrderListDatasource(this.pagination, this.apiService);
    this.dataSource.setAuctionId(this.auctionId);
    this.dataSource.search();
  }
}
