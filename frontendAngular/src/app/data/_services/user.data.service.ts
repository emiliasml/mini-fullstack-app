import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser, IUserCreate } from '../_models/user.interface';
import { BaseDataService } from './base.data.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserDataService extends BaseDataService<IUser, IUserCreate> {
  constructor(private httpClient: HttpClient, private router: Router) {
    super(httpClient, router);
    this.serviceURL = '/users';
  }
}
