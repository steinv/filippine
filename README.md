# [![GitHub license](https://img.shields.io/github/license/Smip/ngx-materialize.svg)](https://github.com/Smip/ngx-materialize/blob/master/LICENSE) Filippine

Filippine puzzle with Angular

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
    <filippine [configuration]="configuration" (answer)="questionAnswered(answer)>

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
     * do something with the reply:Answer 
     * reply.question
     * reply.answer
     */
  }
```