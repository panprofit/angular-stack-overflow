import {Component, OnInit} from '@angular/core';
import {QuestionsService, QuestionData} from '../../shared/questions.service';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-question-details',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public question$: Observable<QuestionData>;

  constructor(
    private route: ActivatedRoute,
    private questionsService: QuestionsService
  ) {
  }

  ngOnInit(): void {
    this.question$ = this.route.params
      .pipe(
        flatMap((params) => this.questionsService.getQuestion(params.id))
      );
  }

}
