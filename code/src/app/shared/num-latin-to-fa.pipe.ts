import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numLatinToFa',
})
export class NumLatinToFaPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\d/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
  }
}
