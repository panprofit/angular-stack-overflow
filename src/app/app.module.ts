import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {QuestionsModule} from './questions/questions.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: './questions/questions.module#QuestionsModule'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    QuestionsModule.forRoot({
      apiUrl: environment.API_URL,
      apiKey: environment.API_KEY,
      apiVersion: environment.API_VERSION
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
