import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionsComponent} from './questions/questions.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {IConfig, QuestionsService} from '../shared/questions.service';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';

const routes: Routes = [
  {
    path: '',
    component: QuestionsComponent
  },
  {
    path: ':id',
    loadChildren: '../question/question.module#QuestionModule'
  }
];

@NgModule({
  declarations: [
    QuestionsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forChild(routes),
    FlexModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
    FormsModule,
    MatTableModule,
    CdkTableModule
  ],
  exports: [RouterModule]
})
export class QuestionsModule {
  static forRoot(config: IConfig): ModuleWithProviders {
    return {
      ngModule: QuestionsModule,
      providers: [
        QuestionsService,
        {
          provide: 'config',
          useValue: config
        }
      ]
    };
  }
}
