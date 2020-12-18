# Filippine

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## Usage

1. Install from npm
`npm install filippine`

2. Import the module in your **app.module.ts**
```ts
import { FilippineModule } from 'filippine/filippine.module';

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

3. Add a configuration for your filippine puzzle in your **component**
```ts
  public configuration: Configuration = {
    questions: [
      {question: 'q1?', answer: 'abcdefghijklm', answerLength: 13, answerPosition: 10},
      {question: 'q2?', answer: 'abcd', answerLength: 4, answerPosition: 1},
      {question: 'q3?', answer: 'abcde', answerLength: 5, answerPosition: 2},
      {question: 'q4?', answer: 'abcdefgh', answerLength: 8, answerPosition: 2},
    ]
  }
```

4. Add the filippine directive in your **component template**
```html
    <filippine [configuration]="configuration">

    </filippine>
```

## Code scaffolding

Run `ng generate component component-name --project filippine` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project filippine`.
> Note: Don't forget to add `--project filippine` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build filippine` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build filippine`, go to the dist folder `cd dist/filippine` and run `npm publish`.

## Running unit tests

Run `ng test filippine` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
