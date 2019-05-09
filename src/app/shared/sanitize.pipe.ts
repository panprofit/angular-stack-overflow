import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) {
  }

  transform(text: string): SafeHtml {
    return this.sanitized.bypassSecurityTrustHtml(text);
  }
}
