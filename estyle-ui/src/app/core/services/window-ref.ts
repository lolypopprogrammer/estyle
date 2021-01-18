import { Injectable } from '@angular/core';

function _window(): any {
  return window as Window;
}

@Injectable()
export class WindowRef {
  get nativeWindow(): any {
    return _window();
  }
}
