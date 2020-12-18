import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit, ContentChild, ElementRef, AfterContentInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'grid-tile',
  templateUrl: './grid-tile.component.html',
  styleUrls: ['./grid-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridTileComponent  implements AfterContentInit, AfterContentChecked {

  @Input() public colspan: number = 1;
  @HostBinding('style.width') private _width: string = '100%';
  @HostBinding('style.height') private _height: string = '50px';

  constructor (
    private readonly _elementRef: ElementRef,
    private readonly _changeDetectorRef: ChangeDetectorRef
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

  ngAfterContentChecked(): void {
    this._changeDetectorRef.detectChanges();
  }

}
