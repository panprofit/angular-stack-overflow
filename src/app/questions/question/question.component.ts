import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {QuestionData} from '../../shared/questions.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-question-details',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  constructor(
    public modal: MatDialogRef<QuestionComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public question: QuestionData
  ) {
  }

  searchTag(tagged: string) {
    this.modal.close();
    const queryParams = {tagged};
    this.router.navigate(['/'], {queryParams});
  }

}
