import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isNullOrUndefined } from 'util';

import {
  HttpJsendResponse,
  JsendResponse,
  RequestMethod,
  RequestOptions
} from './http.types';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl: string;
  public headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
    const config = environment.api || ({} as any);
    this.baseUrl = config.url;
    const headers = {
      ...(config.default_headers || {}),
      ...{
        Accept: 'application/json',
        // 'Content-Type': 'application/json'
      }
    };
    if (!isNullOrUndefined(config.key)) headers['app-key'] = config.key;
    this.headers = new HttpHeaders(headers);
  }

  public async get(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<JsendResponse> {
    return await this.request('GET', endpoint, options);
  }

  public async post(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<JsendResponse> {
    return await this.request('POST', endpoint, options);
  }

  public async put(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<JsendResponse> {
    return await this.request('PUT', endpoint, options);
  }

  public async delete(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<JsendResponse> {
    return await this.request('DELETE', endpoint, options);
  }

  public async request(
    method: RequestMethod,
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<JsendResponse> {
    const url = this.baseUrl + (endpoint || '');
    const req = this.http.request(method, url, {
      observe: 'events',
      body: options.body,
      headers: this.mergeHeaders(options.headers),
      reportProgress: true
    });

    const p = new Promise<HttpJsendResponse>((resolve, reject) => {
      const subscriber = Subscriber.create(
        (event: any) => {
          // progress
          if (event.type === HttpEventType.DownloadProgress) {
            if (!event.total) console.warn('No Content-Length header provided');
            else {
              let percentage = (100 / event.total) * event.loaded;
              // console.log(`progress: ${percentage}`);
            }
          }
          // finished
          if (event.type === HttpEventType.Response) {
            // console.log(`Response with status: ${event.status}`);
            resolve(event);
          }
        },
        err => {
          if (!options.ignoreMessage) this.notify(err);
          reject(err);
        }
      );
      req.subscribe(subscriber);
    });
    let response: HttpJsendResponse = null;
    try {
      response = await p;
    } catch (error) {
      response = error;
    }
    options.receiver = response;

    if (!options.ignoreMessage) this.notify(response);
    if (response instanceof HttpErrorResponse) throw response;

    let obj = response.body;
    if ((environment.api.parsers || ({} as any)).apiResponses)
      obj = environment.api.parsers.apiResponses(response);
    return obj;
  }

  private mergeHeaders(customHeaders: HttpHeaders): HttpHeaders {
    const appends: HttpHeaders = customHeaders || new HttpHeaders();
    let headers: HttpHeaders = new HttpHeaders();
    this.headers
      .keys()
      .filter(name => !appends.keys().includes(name))
      .forEach(name => (headers = headers.set(name, this.headers.get(name))));
    appends
      .keys()
      .forEach(name => (headers = headers.set(name, appends.get(name))));
    return headers;
  }

  public get url(): string {
    return this.baseUrl;
  }

  notify(response: HttpJsendResponse) {
    let obj =
      (response as HttpResponse<JsendResponse>).body ||
      (response as HttpErrorResponse).error;
    if ((environment.api.parsers || ({} as any)).apiResponses)
      obj = environment.api.parsers.apiResponses(response as any);
    if (obj) {
      const status: number = response.status;
    }
  }

}
