import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

}
