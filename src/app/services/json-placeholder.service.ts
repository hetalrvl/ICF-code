import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { JsonReponse } from '../interfaces/json-reponse';

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceholderService {
  sub = new BehaviorSubject('');
  observable = this.sub.asObservable();

  someDataToShare:any = null;
  BASE_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {
  }

  getAllPost (): Observable<JsonReponse[]> {
    if (this.someDataToShare) {
      return of(this.someDataToShare);
    }
    // make api call
    return this.http.get<JsonReponse[]>(this.BASE_URL + '/posts');
  }

  getSinglePost(id: number): Observable<JsonReponse> {
    return this.http.get<JsonReponse>(this.BASE_URL + '/posts/' + id);
  }

  setPost (title: string, body: string) {
    return this.http.post(this.BASE_URL + '/posts', {
      title: title,
      body: body
    });
  }
}
