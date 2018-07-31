import {Injectable} from '@angular/core';

@Injectable()
export class AccountService {
  isAuth = true;

  setIsAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

}
