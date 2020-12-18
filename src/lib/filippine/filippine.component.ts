import { Configuration, Question } from '../configuration';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'filippine',
  templateUrl: './filippine.component.html',
  styleUrls: ['./filippine.component.scss']
})
export class FilippineComponent implements OnInit {

  @Input()
  public configuration!: Configuration;

  public filippineForm = new FormGroup({});
  public columns: number = 1;
  public tiles: Array<Array<any>> = [];

  public constructor() { }

  public ngOnInit(): void {
    /**
     * Calculate how big the grid should be
     */
    const left = this.configuration.questions.reduce((acc: any, q: any) => acc = acc > q.answerPosition  ? acc : q.answerPosition, 0);
    const right = this.configuration.questions.reduce((acc: any, q: any) => acc = acc > q.answerLength - q.answerPosition ? acc : q.answerLength - q.answerPosition, 0);
    this.columns = left + right;

    /**
     * map the configuration to the tiles on the grid
     * Creates a filippineForm that can validate each question
     */
    this.configuration.questions.map(
      (m: Question, i: number) => {
        const blankCellsLeft = left - m.answerPosition;
        const blankCellsRight = this.columns - (m.answerLength + blankCellsLeft);
        const inputCells = m.answerLength;

        this.tiles.push(new Array());
        if(blankCellsLeft > 0) {
          this.tiles[i].push({color: 'black', text:'', colspan: blankCellsLeft});
        }

        const formQuestion = new FormGroup({}, this.rightAnswer(m.answer));
        for(let index = 0; index < inputCells; index++) {
          const color = (index === m.answerPosition)? 'yellow': 'white';
          this.tiles[i].push({color: color, text: m.answer[index], colspan: 1, question: true, name: index, index: i.toString()+','+(index+blankCellsLeft).toString()});
          formQuestion.addControl(index.toString(), new FormControl());// m.answer.charAt(index)
        }
        this.filippineForm.addControl('Q'+i.toString(), formQuestion);

        if(blankCellsRight > 0) {
          this.tiles[i].push({color: 'black', text:'_', colspan: blankCellsRight});
        }
      }
    );
  }

  public rightAnswer(answer: string): ValidatorFn {  
    return (c: AbstractControl): { [key: string]: any } | null => {
      let question = c as FormGroup;
      let invalid = false;
      for (const field in question.controls) { 
        const control = question.get(field);
        
        // only validate answer when entire group is filled
        if(!control || !control.value) {
          return null;
        }

        if(control.value.toUpperCase() !== answer.charAt(+field).toUpperCase()) {
          invalid = true;
        }
      }
      return invalid ? {invalid: true} : null;
    }
  }
  
}
