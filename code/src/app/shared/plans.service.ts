import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_API} from "./url";

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(private httpClient: HttpClient) { }

  public fetchPlans(): Observable<any> {
    return this.httpClient.get(`${BASE_API}plan/plans/`);
  }
}
