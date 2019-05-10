import {NgModule} from '@angular/core';
import {SanitizePipe} from './sanitize.pipe';
import {UnescapePipe} from './unescape.pipe';

@NgModule({
  declarations: [
    SanitizePipe,
    UnescapePipe
  ],
  exports: [
    SanitizePipe,
    UnescapePipe
  ],
  imports: []
})
export class SharedModule {
}
