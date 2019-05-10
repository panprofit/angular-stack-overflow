import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {QuestionData} from '../../shared/questions.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  constructor(
    public modal: MatDialogRef<QuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public question: QuestionData
  ) {
  }

}
