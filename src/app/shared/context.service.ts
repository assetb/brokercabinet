import {Injectable} from '@angular/core';
import {StatusModel} from './models/status.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {SectionModel} from './models/section.model';
import {TypeModel} from './models/type.model';
import {SiteModel} from './models/site.model';
import {ApiService} from './api.service';

@Injectable()
export class ContextService {
  roles: string[];
  readonly statuses = new BehaviorSubject<StatusModel[]>([]);
  readonly sections = new BehaviorSubject<SectionModel[]>([]);
  readonly types = new BehaviorSubject<TypeModel[]>([]);
  readonly sites = new BehaviorSubject<SiteModel[]>([]);

  constructor(private apiService: ApiService) {
  }

  isInRole(role: string): boolean {
    return this.roles.find(element => element === role) != null;
  }

  updateSections() {
    this.apiService.getSections()
      .subscribe(responce => {
        this.sections.next(responce);
      });
  }

  updateTypes() {
    this.apiService.getTypes()
      .subscribe(responce => {
        this.types.next(responce);
      });
  }

  updateSites() {
    this.apiService.getSites()
      .subscribe(responce => {
        this.sites.next(responce);
      });
  }

  updateStatuses() {
    this.apiService.getStatuses()
      .subscribe(statuses => {
        this.statuses.next(statuses);
      });
  }

  updateRoles() {
    this.apiService.getRoles()
      .subscribe(value => {
        this.roles = value;
      });
  }

  update() {
    this.updateRoles();
    this.updateStatuses();
    this.updateSections();
    this.updateSites();
    this.updateTypes();
  }
}
