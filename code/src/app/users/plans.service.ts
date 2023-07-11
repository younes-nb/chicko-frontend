import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_API} from "../shared/url";
import {UserPlan} from "../shared/types";

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(private httpClient: HttpClient) {
  }

  public fetchPlans(): Observable<any> {
    return this.httpClient.get(`${BASE_API}plan/plans/`);
  }

  public fetchUserPlan(user_id: string): Observable<any> {
    return this.httpClient.get(`${BASE_API}plan/user-plans/${user_id}/`, {headers: {NeedsUserTokenHeader: ''}});
  }

  public createUserPlan(user: string, plan: string): Observable<any> {
    return this.httpClient.post(`${BASE_API}plan/user-plans/create/`, {
      user,
      plan
    }, {headers: {NeedsUserTokenHeader: ''}});
  }

  hasActivePlan(userPlans: UserPlan[]): boolean {
    for (const userPlan of userPlans) {
      if (userPlan.is_active) {
        return true;
      }
    }
    return false;
  }
}
