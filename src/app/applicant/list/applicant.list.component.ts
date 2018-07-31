import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {ApplicantDataSource} from '../applicant.data.source';
import {ApiService} from '../../shared/api.service';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant.list.component.html',
  styleUrls: ['./applicant.list.component.css']
})
export class ApplicantListComponent implements OnInit {
  @Input() auctionId: number;
  @ViewChild(MatPaginator) pagination: MatPaginator;

  dataSource: ApplicantDataSource;
  displayedColumns: string[] = ['supplier', 'lot'];

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.dataSource = new ApplicantDataSource(this.pagination, this.apiService);
    this.dataSource.setAuctionId(this.auctionId);
    this.dataSource.search();
  }
}
