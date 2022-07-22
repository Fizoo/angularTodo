import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appColorPr]'
})
export class ColorPrDirective implements OnInit{

  @Input('appColorPr') priority:string
  constructor(private el:ElementRef,private r:Renderer2) { }

  ngOnInit(): void {
    switch (this.priority) {
      case 'High':
        this.r.setStyle(this.el.nativeElement,'backgroundColor','red')
        break
      case 'Middle':
        this.r.setStyle(this.el.nativeElement,'backgroundColor','green')
        break
      case 'Low':
        this.r.setStyle(this.el.nativeElement,'backgroundColor','gray')
        break
      default :break
    }

  }

}
