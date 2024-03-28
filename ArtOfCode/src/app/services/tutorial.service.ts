import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private baseUrl: string = 'http://localhost:8081/api/tutorial/';

  constructor(private http: HttpClient) {}

  getAllTutorials(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(this.baseUrl + 'getAllTutorials');
  }

  addtutorial(tutorial: Tutorial): Observable<Tutorial> {
    return this.http.post<Tutorial>(this.baseUrl + 'addOrUpdate', tutorial);
  }

  deleteTutorial(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'delete/' + id);
  }

  filterTutorialsByLevel(level: string): Observable<Tutorial[]> {
    const params = new HttpParams().set('level', level);
    return this.http.get<Tutorial[]>(`${this.baseUrl}/filterByLevel`, {
      params,
    });
  }

  getTutorialById(tutorialIdt: number): Observable<Tutorial> {
    return this.http.get<Tutorial>(
      this.baseUrl + 'getTutorialById/' + tutorialIdt
    );
  }
  public updatetutorial(id: number, tutorial: Tutorial): Observable<Tutorial> {
    return this.http.put<Tutorial>(
      `${this.baseUrl}updateTutorial/${id}`,
      tutorial
    );
  }

  getEventsPaged(
    page: number,
    pageSize: number,
    level: null | string,
    category: null | string
  ): Observable<any> {
    let options: string = `?page=${page}&pageSize=${pageSize}`;
    if (!!level) options += `&level=${level}`;
    if (!!category) options += `&categoryId=${category}`;
    const url = `${this.baseUrl}pagedd${options}`;
    return this.http.get<any>(url);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8081/api/category/all`);
  }
}
