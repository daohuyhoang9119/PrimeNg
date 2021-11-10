import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private REST_API_SERVER = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}
  //get Notes
  public getNotes(authorId: Number): Observable<Note[]> {
    const url = `${this.REST_API_SERVER}/notes?authorId=${authorId}`;
    return this.httpClient.get<Note[]>(url, this.httpOptions);
  }
  //post Notes
  public postNotes(data: any): Observable<Note> {
    const url = `${this.REST_API_SERVER}/notes`;
    return this.httpClient.post<Note>(url, data, this.httpOptions);
  }
}
