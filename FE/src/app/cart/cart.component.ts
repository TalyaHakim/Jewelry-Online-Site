import { Component, OnInit } from '@angular/core';
import { CartService, ICart, item } from '../cart.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  faTrashAlt = faTrashAlt;
  items: item[] | undefined = [];
  totalPrice:number | undefined =  0

  constructor(private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data => {
      this.items = data.items;
        this.totalPrice = data.totalPrice
    })
  };

  addOneItem(item: item): void {
    this.cartService.addItemToCart([item])
      .subscribe(data => {
        if (data) {
          this.items = data.items;
          this.cartService.itemAdded.next(data.totalQty);
            this.totalPrice = data.totalPrice
        }
      });
  }

  removeItem(id: any) {
    const userId = this.authService.userValue
    if (userId) {
      this.cartService.removeItem(id)
        .subscribe(data => {
          this.items = data.items;
          this.cartService.itemAdded.next(data.totalQty);
          this.totalPrice = data.totalPrice      
      })
    }
  }

  reduceOneItem(item: item): void {
    if (item.amount === 1) return;
    const userId = this.authService.userValue.user.uid;
    if (userId) {
      const body = { itemId: item._id, price: item.price, userId };
      this.cartService.reduceOneItem(body)
        .subscribe(data => {
          this.items = data.items;
          this.cartService.itemAdded.next(data.totalQty);
          this.totalPrice = data.totalPrice;
        })
    }
  }

}
