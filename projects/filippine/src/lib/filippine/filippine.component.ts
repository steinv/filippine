import { Answer } from './../configuration';
import { Configuration, Question } from '../configuration';
import { Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'filippine',
  templateUrl: './filippine.component.html',
  styleUrls: ['./filippine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilippineComponent implements OnInit, AfterViewInit {

  @Input()
  public configuration!: Configuration;

  @Output()
  public answer = new EventEmitter<Answer>();

  /**
   * Emits when the form has been completed
   * returns false when answered wrongly, true when correctly answered
   */
  @Output()
  public completed = new EventEmitter<boolean>();

  public filippineForm = new FormGroup({});
  public columns: number = 1;
  public tiles: Array<Array<any>> = [];

  public constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    /**
     * Calculate how big the grid should be
     */
    const left = this.configuration.questions.reduce((acc: any, q: any) => acc = acc > q.answerPosition ? acc : q.answerPosition, 0);
    const right = this.configuration.questions.reduce((acc: any, q: any) => acc = acc > q.answerLength - q.answerPosition ? acc : q.answerLength - q.answerPosition, 0);
    this.columns = left + right;

    /**
     * map the configuration to the tiles on the grid
     * Creates a filippineForm that can validate each question
     */
    let inputFieldCounter = 0;
    this.configuration.questions.map(
      (m: Question, i: number) => {
        const blankCellsLeft = left - m.answerPosition;
        const blankCellsRight = this.columns - (m.answerLength + blankCellsLeft);
        const inputCells = m.answerLength;

        this.tiles.push(new Array());
        if (blankCellsLeft > 0) {
          this.tiles[i].push({ colspan: blankCellsLeft, question: false, highlight: false });
        }

        const formQuestion = new FormGroup({}, this.rightAnswer(m));
        for (let index = 0; index < inputCells; index++) {
          this.tiles[i].push({
            index: inputFieldCounter,
            highlight: (index === m.answerPosition),        // highlighted box or not
            colspan: 1,                                     // colspan for question is always 1
            question: true,                                 // question or spacer
            name: index,                                    // formControlName based on index
            coordinates: i.toString() + ',' + (index + blankCellsLeft).toString() // coorindates row, column
          });
          inputFieldCounter++;
          formQuestion.addControl(index.toString(), new FormControl(''));// m.answer.charAt(index)
        }
        this.filippineForm.addControl(i.toString(), formQuestion);

        if (blankCellsRight > 0) {
          this.tiles[i].push({ colspan: blankCellsRight, question: false, highlight: false });
        }

        this.filippineForm.valueChanges.subscribe(() => {
          for (const group in this.filippineForm.controls) {
            const controlGroup = this.filippineForm.get(group) as FormGroup;
            for (const field in controlGroup.controls) {
              const inputField = controlGroup.get(field);
              if (!inputField || !inputField.value) {
                return;
              }
            }
          }

          this.completed.emit(this.filippineForm.valid);
        });
      }
    );
  }

  public rightAnswer(question: Question): ValidatorFn {
    return (c: AbstractControl): { [key: string]: any } | null => {
      let formGroup = c as FormGroup;

      let invalid = false;
      let reply = '';
      for (const field in formGroup.controls) {
        const control = formGroup.get(field);

        // only validate answer when entire group is filled
        if (!control || !control.value) {
          return null;
        }

        // concat control value upon reply string
        reply += control.value;

        // validate response
        if (question.answer &&
          question.answer.length >= +field &&
          control.value.toUpperCase() !== question.answer.charAt(+field).toUpperCase()
        ) {
          invalid = true;
        }
      }


      // emit answer that client entered
      if (reply) {
        this.answer.emit({
          question: question,
          answer: reply,
        });
      }
      return invalid ? { invalid: true } : null;
    }
  }

  public ngAfterViewInit(): void {
    this._changeDetectorRef.detectChanges();
  }
}

