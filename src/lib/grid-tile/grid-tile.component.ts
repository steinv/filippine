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
  @HostBinding('style.height') private _height: string = '50px';

  constructor (
    private readonly _elementRef: ElementRef,
  ) { }

  set width(width: string) {
    this._width = width;
  }

  set height(height: string) {
    this.height = height;
  }

  ngAfterContentInit() {
    const element = this._elementRef.nativeElement as HTMLElement;
  }
}
