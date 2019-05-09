import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionComponent} from './question/question.component';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule, MatChipsModule} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: QuestionComponent
  }
];

@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatChipsModule,
    FlexModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class QuestionModule {
}
