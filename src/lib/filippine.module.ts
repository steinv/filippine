import { GridTileComponent } from './grid-tile/grid-tile.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { FilippineComponent } from './filippine/filippine.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FilippineComponent, GridListComponent, GridTileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FilippineComponent]
})
export class FilippineModule { }
