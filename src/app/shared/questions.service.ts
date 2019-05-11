import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuestionsService {

  constructor(
    private http: HttpClient,
    @Inject('config') private config: IConfig
  ) {
  }

  getList(config: QueryConfig): Observable<object> {
    return this.getRequest('search/advanced', config);
  }

  getRequest(url: string, queryParams: QueryConfig): Observable<object> {
    const params = Object.assign({}, queryParams, {
      key: this.config.apiKey,
      site: 'stackoverflow',
      filter: 'withbody',
      pagesize: '30',
      sort: 'creation',
      order: 'desc'
    });
    return this.http.get(`${this.config.apiUrl}/${this.config.apiVersion}/${url}`, {params});
  }

}

export interface QueryConfig {
  tagged?: string;
  sort?: string;
  order?: string;
  page?: number;
  pagesize?: number;
}

export interface QuestionsData {
  has_more: boolean;
  items: Array<QuestionData>;
}

export interface QuestionData {
  title: string;
  link: string;
  is_answered: boolean;
  creation_date: Date;
  question_id: number;
  owner: QuestionOwnerData;
  description: string;
  published: Date;
  author: string;
  author_id: string;
  body?: string;
  tags: Array<string>;
}

export interface QuestionOwnerData {
  display_name: string;
  link: string;
  profile_image: string;
  reputation: number;
  user_id: number;
  user_type: string;
}

export interface IConfig {
  apiUrl: string;
  apiKey: string;
  apiVersion: string;
}
