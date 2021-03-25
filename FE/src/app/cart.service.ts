import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { AuthService } from "./auth.service";

export interface ICart {
    _id?: string;
    userId?: string;
    items?: item[];
    totalQty?: number;
    totalPrice?: number;
}
export interface item {
    _id:string,
    stoneNum: string,
    name: string,
    carat: string,
    shape: string,
    price: number,
    size: string,
    content: string,
    img: string,
    amount?:number
}

@Injectable({
    providedIn: "root"
})

export class CartService {

    itemAdded = new Subject<number>();

    constructor(private http: HttpClient, private authService: AuthService) { }

    createCart(): Observable<ICart> {
        const cart: ICart = {
            userId: this.authService.userValue.user.uid,
            items: [],
            totalPrice: 0,
            totalQty: 0,
        }
        return this.http.post<ICart>('http://localhost:3000/cart', cart);
    }

    getCartItems(): Observable<ICart> {
        const uid = this.authService.userValue.user.uid;

        return this.http.get<ICart>(`http://localhost:3000/cart/get-cart/${uid}`);
    }

    addItemToCart(items: item[]): Observable<ICart> {
        const userId = this.authService.userValue.user.uid;
        return this.http.put<ICart>('http://localhost:3000/cart/add-to-cart', { userId, items })
    }

    removeItem(itemId: string): Observable<ICart> {
        const userId = this.authService.userValue.user.uid;
        return this.http.post<ICart>('http://localhost:3000/cart/remove-item', { userId, itemId })
    }

    reduceOneItem(body: { itemId: string, price: number, userId: string}): Observable<ICart> {
        return this.http.post<ICart>('http://localhost:3000/cart/reduce-one-item', body)
    }
}