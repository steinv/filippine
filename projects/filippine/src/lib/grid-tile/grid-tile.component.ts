import { ChangeDetectionStrategy, Component, HostBinding, Input, ElementRef, AfterContentInit } from '@angular/core';

@Component({
  selector: 'grid-tile',
  templateUrl: './grid-tile.component.html',
  styleUrls: ['./grid-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridTileComponent  implements AfterContentInit {

  @Input() public colspan: number = 1;
  @HostBinding('style.width') private _width: string = '100%';

  constructor (
    private readonly _elementRef: ElementRef,
  ) { }

  set width(width: string) {
    this._width = width;
  }
  
  ngAfterContentInit() {
    const element = this._elementRef.nativeElement as HTMLElement;
  }
}
