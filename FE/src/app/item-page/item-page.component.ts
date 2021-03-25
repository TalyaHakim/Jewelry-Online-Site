import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {

  product: any = null;
  env = environment;
  faArrowLeft = faArrowLeft;

  constructor(private router: ActivatedRoute, private nevRouter: Router, private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      if (params.hasOwnProperty('_id')) {
        this.product = params;
      }
    })
  }

  productToAdd(product: any) {
    console.log('Product ', product)
    this.product = product;
    console.log(this.product)
  }
  goBack() {
    this.nevRouter.navigate(['/jewelry'])
  }

  addToCart() {
    const user = this.authService.userValue;
  
    this.product = {
      ...this.product,
      amount: 1
    }
    if (user) {
      this.cartService.addItemToCart([this.product])
        .subscribe(data => {
          if (data) {
            console.log(data);
            this.cartService.itemAdded.next(data.totalQty)
          }
        });
    }
    else {
      this.authService.googleLogin().then((user) => {
        this.cartService.createCart()
          .pipe(switchMap(data => this.cartService.addItemToCart([this.product])))
          .subscribe(data => {
            if (data) {
              console.log(data);
              this.cartService.itemAdded.next(data.totalQty)
            }
          })
      })
    }
  }
}