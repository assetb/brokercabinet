import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {LotDataSource} from '../lot.data.source';
import {MatPaginator} from '@angular/material';

@Component({
  selector: 'app-lot-list',
  templateUrl: './lot.list.component.html',
  styleUrls: ['./lot.list.component.css']
})
export class LotComponent implements OnInit {
  @ViewChild(MatPaginator) pagination: MatPaginator;
  dataSource: LotDataSource;
  displayedColumns: string[] = ['number', 'name', 'unit', 'quantity', 'price', 'sum', 'step'];

  constructor(private apiService: ApiService) {
  }

  @Input() auctionId: number;

  ngOnInit(): void {
    this.dataSource = new LotDataSource(this.pagination, this.apiService);
    this.dataSource.setAuctionId(this.auctionId);
    this.dataSource.search();
  }

}
