import { Injectable } from '@angular/core';
import {typeWithParameters} from '@angular/compiler/src/render3/util';
import {ERROR_TYPE} from '@angular/core/src/errors';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  public static DEFAULT_MSG = 0;
  public static ERROR_MSG = 1;
  public static WARN_MSG = 3;

  public LOG_TAG: string;

  constructor(tag: string) {
    this.LOG_TAG = tag;
  }

  print(message: string, type: number) {
    switch (type) {
      case LogService.DEFAULT_MSG:
        console.log(this.LOG_TAG + message);
        break;
      case LogService.ERROR_MSG:
        console.error(this.LOG_TAG + message);
        break;
      case LogService.WARN_MSG:
        console.warn(this.LOG_TAG + message);
        break;
    }
  }

  printLogWithObject(message: string, object: any) {
    console.log(this.LOG_TAG + message);
    console.log(object);
  }
}
