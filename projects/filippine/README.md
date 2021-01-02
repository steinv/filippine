# [![GitHub license](https://img.shields.io/badge/license-mit-green.svg)](https://github.com/steinv/filippine/blob/main/projects/filippine/LICENSE) Filippine

Filippine puzzle with Angular
![Example](https://github.com/steinv/filippine/blob/main/projects/filippine/assets/example.png)

## Usage

1. Install from npm
`npm install @steinv/filippine`

2. Import the module in your **app.module.ts**
```ts
import { FilippineModule } from '@steinv/filippine';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    FilippineModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

3. Add the filippine directive in your **component template**
```html
    <filippine 
      [configuration]="configuration" 
      (answer)="questionAnswered($event)" 
      (completed)="puzzleCompleted($event)">
    </filippine>
```

4. Add a configuration and handle output for your filippine puzzle in your **component**
```ts
  public configuration: Configuration = {
    questions: [
      {question: 'q1?', answer: 'abcdefghijklm', answerLength: 13, answerPosition: 10},
      {question: 'q2?', answer: 'abcd', answerLength: 4, answerPosition: 1},
      {question: 'q3?', answer: 'abcde', answerLength: 5, answerPosition: 2},
      {question: 'q4?', answer: 'abcdefgh', answerLength: 8, answerPosition: 2},
    ]
  }

  public questionAnswered(reply: Answer) {
    /**
     * do something with the reply: Answer 
     * reply.question
     * reply.answer
     */
  }

  public puzzleCompleted(result: boolean) {
    /**
     * do something with the result: boolean 
     */
     if (result) {
      console.log('well done!');
     } else {
      console.log('Uh-Oh looks like you made a mistake');
     }
  }
```

## Style

You can override the used css selectors to define your own custom styling
```css
/* grid-tiles used for spacing */
.spacer {
  background-color: transparent; 
  border: none;
  box-shadow: none;
}
/* grid-tiles used for input */
.input {
    background-color: white;
    border: 1px solid black;
}
/* highlighted input grid-tiles */
.highlight {
    background-color: yellow;
}
```
