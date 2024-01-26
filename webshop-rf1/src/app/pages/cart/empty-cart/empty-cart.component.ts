import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrls: ['./empty-cart.component.scss']
})
export class EmptyCartComponent {
  @Input() visible: boolean = false;
  @Input() emptyCart: string = "Nothing found!";
  @Input() resetLinkText: string = "Reset";
  @Input() resetLinkRoute: string = "/";

}
