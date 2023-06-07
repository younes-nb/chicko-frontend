import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumLatinToFaPipe } from './num-latin-to-fa.pipe';

@NgModule({
  declarations: [NumLatinToFaPipe],
  imports: [CommonModule],
  exports: [NumLatinToFaPipe],
})
export class AppPipModule {}
