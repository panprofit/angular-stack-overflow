import {Component, OnInit} from '@angular/core';
import {QuestionsService, QuestionData, QuestionsData} from '../../shared/questions.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BehaviorSubject, fromEvent, merge, Observable, of} from 'rxjs';
import {debounceTime, distinct, flatMap, map, filter, tap, takeWhile} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {QuestionComponent} from '../question/question.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  public questionsList$: Observable<Array<QuestionData>>;

  private tagged: string;
  private cache: Array<QuestionData>;
  private hasMore = true;

  private pageByManual$ = new BehaviorSubject(1);

  private onScroll$ = fromEvent(window, 'scroll')
    .pipe(
      map(() => window.scrollY),
      filter((current) => current >= document.body.offsetHeight - window.innerHeight),
      debounceTime(200),
      map((data) => Math.floor(data / 100)),
      distinct(),
      map(() => this.pageByManual$.getValue())
    );

  private pageToLoad$ = merge(this.onScroll$, of(1))
    .pipe(
      distinct(),
      tap((page) => this.pageByManual$.next(page + 1))
    );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.questionsList$ = this.route.queryParams.pipe(
      tap(() => {
        window.scrollTo(0, 0);
        this.cache = [];
        this.pageByManual$.next(1);
      }),
      flatMap((params: Params) => {
        this.tagged = params.tagged;
        return this.pageToLoad$;
      }),
      takeWhile(() => this.hasMore),
      flatMap((page: number) => this.questionsService.getList({page, tagged: this.tagged})),
      map((data: QuestionsData) => {
        this.cache.push(...data.items);
        this.hasMore = data.has_more;
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

}
