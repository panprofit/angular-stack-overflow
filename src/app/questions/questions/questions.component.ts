import {Component, OnInit} from '@angular/core';
import {QuestionsService, QuestionData, QuestionsData} from '../../shared/questions.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {flatMap, map, takeWhile, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {QuestionComponent} from '../question/question.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  public questionsList$: Observable<Array<QuestionData>>;
  public cache: Array<QuestionData> = [];
  private hasMore = true;
  private tagged: string;

  private loadMore$ = new BehaviorSubject(1);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.questionsList$ = this.route.queryParams
      .pipe(
        tap((params: Params) => {
          this.tagged = params.tagged || '';
          this.cache = [];
        }),
        flatMap(() => this.loadMore$),
        takeWhile(() => this.hasMore),
        flatMap((page: number) => this.questionsService.getList({page, tagged: this.tagged})),
        map((data: QuestionsData) => {
          this.hasMore = data.has_more;
          this.cache.push(...data.items);
          return this.cache;
        })
      );
  }

  openModal(data: QuestionData) {
    this.dialog.open(QuestionComponent, {
      width: '650px',
      data
    });
  }

  onScroll(index) {
    if (this.cache.length && this.cache.length === (index + 17)) {
      this.loadMore$.next(this.loadMore$.getValue() + 1);
    }
  }
}
