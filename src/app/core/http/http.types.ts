import { HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions {
  params?: { [param: string]: string | string[] };
  body?: object;
  headers?: HttpHeaders;
  ignoreMessage?: boolean;
  receiver?: any;
}

export interface JsendResponse {
  status: 'success' | 'fail' | 'error' | 'OK';
  data?: any;
  message?: string;
  pagination?: ResponsePagination; // ! Check functionality for vytraAPI
}
export type HttpJsendResponse = HttpResponse<JsendResponse> | HttpErrorResponse;

export interface ResponsePagination { // ! Check pagination format of VytraAPI
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  prev_page_url: string;
  path: string;
}


/* #################### DATA INTERACTION TYPES #################### */ // ! CHANGE
export interface Where {
  column: string;
  op: '=' | '!=' | '>=' | '<=' | 'like';
  value: string | number | boolean;
}

export interface DataSort {
  column: string;
  direction: 'asc' | 'desc';
}

export type QueryType = 'or' | 'and';
export interface DataQuery { // TODO: Implement queries in backend !
  type: QueryType;
  values: (Where | DataQuery)[];
}

export function query(t: QueryType, v: (Where | DataQuery)[]): DataQuery {
  return {
    type: t,
    values: v
  };
}

export interface DataPaginator {
  page: number;
  per_page?: number;
}

export interface DataParams {
  search?: string;
  show_deleted?: boolean;
  sort?: DataSort;
  paginator?: DataPaginator;
  query?: DataQuery; // TODO: Create compatibility in backend
}

/* #################### AUTH TYPES #################### */
export interface AuthUrls {
  login?: string;
  logout?: string;
  validate?: string;
}

export interface AuthCredentials {
  fcmWeb: string;
  nombreUsuario: string;
  password: string;
}
