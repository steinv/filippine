import { GridTileComponent } from './../grid-tile/grid-tile.component';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Input, QueryList } from '@angular/core';

@Component({
  selector: 'grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridListComponent implements AfterContentInit {

  @Input()
  public cols!: number;

  @ContentChildren(GridTileComponent)
  private readonly tiles!: QueryList<GridTileComponent>;

  constructor() { }

  ngAfterContentInit(): void {
    this.tiles.map(tile => { tile.width = ((tile.colspan*100) / this.cols).toString()+'%'});
  }


}
