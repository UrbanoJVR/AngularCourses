import {Pageable} from './pageable';
import {Sort} from './sort';

export class Page<T> {
  content: T[];

  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;

  pageable: Pageable;

  size: number;

  sort: Sort;

  totalElements: number;
  totalPages: number;
}
