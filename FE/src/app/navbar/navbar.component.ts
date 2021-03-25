import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../cart.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  isUser = false;
  name: string = ''
  faShoppingCart = faShoppingCart;
  totalQty: number = 0;


  constructor(private authService: AuthService, private cart: CartService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(data => {
      this.isUser = !!data;
    })
  }

  loginWithGoogle() {
    this.authService.googleLogin().then((user) => {
      this.name = this.authService.userValue.user.displayName;
      this.cart.createCart().subscribe(data => {
        console.log(data);
        if (data && data.totalQty) { this.totalQty = data.totalQty }
      })
    });
    this.cart.itemAdded.subscribe(number => this.totalQty = number)
  }

  logOut() {
    this.authService.googleLogout().then(() => {
      console.log('success user log out')
      this.name = ''
    })
  }

}
