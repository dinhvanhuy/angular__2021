import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppGlobalService {

  constructor() { }

  public readonly Messages = {
    Error: {
      Required: 'This field is required',
    },
  }
}
