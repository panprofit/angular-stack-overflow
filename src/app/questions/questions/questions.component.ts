import {Component, OnInit} from '@angular/core';
import {QuestionsService, QuestionData} from '../../shared/questions.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {QuestionComponent} from '../question/question.component';

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
    private questionsService: QuestionsService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.questionsList$ = this.route.queryParams.pipe(
      flatMap((params: Params) => {
        this.tag = params.tag;
        return this.questionsService.getList({tagged: params.tag});
      })
    );
  }

  openModal(data: QuestionData) {
    const dialogRef = this.dialog.open(QuestionComponent, {
      width: '650px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
