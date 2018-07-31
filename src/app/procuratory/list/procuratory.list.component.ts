import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {ApiService} from '../../shared/api.service';
import {ProcuratoryDataSource} from '../procuratory.data.source';

@Component({
  selector: 'app-procuratory-list',
  templateUrl: './procuratory.list.component.html',
  styleUrls: ['./procuratory.list.component.css']
})
export class ProcuratoryListComponent implements OnInit {
  @Input() auctionId: number;
  @ViewChild(MatPaginator) pagination: MatPaginator;

  dataSource: ProcuratoryDataSource;
  displayedColumns: string[] = ['supplier', 'lot', 'price'];

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.dataSource = new ProcuratoryDataSource(this.pagination, this.apiService);
    this.dataSource.setAuctionId(this.auctionId);
    this.dataSource.search();
  }
}
