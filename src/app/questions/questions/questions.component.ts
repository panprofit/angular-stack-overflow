import {Component, OnInit} from '@angular/core';
import {QuestionsService, QuestionData} from '../../shared/questions.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  public questionsList$: Observable<Array<QuestionData>>;
  public tag: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService
  ) {
  }

  ngOnInit(): void {
    this.questionsList$ = this.route.queryParams.pipe(
      flatMap((params: Params) => {
        this.tag = params.tag;
        return this.questionsService.getList({tagged: params.tag})
      })
    );
  }

}
