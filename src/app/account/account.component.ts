import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {AccountService} from './account.service';
import {Router} from '@angular/router';
import {ApiService} from '../shared/api.service';

@Component({
  selector: 'app-form-auth',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  Login = new FormControl('', [Validators.required]);
  Password = new FormControl('', [Validators.required]);

  constructor(private route: Router,
              private accountService: AccountService,
              private apiService: ApiService,
              public snackBar: MatSnackBar) {
  }

  onSubmit() {
    this.apiService.postLogin(this.Login.value, this.Password.value)
      .subscribe(value => {
        if (value.Success) {
          this.accountService.setIsAuth(true);
          this.route.navigate(['']);
        } else {
          this.snackBar.open('Не верный логин и/или пароль.', null, {duration: 5000});
          this.Password.setValue('');
        }
      });
  }
}
