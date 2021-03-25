import { Options } from '@angular-slider/ngx-slider';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  Products: Product[] = []

  typeCategory = false;
  shapeCategory = false;

  types: string[] = [
    'Ring',
    'Earrings',
    'Necklaces'
  ]

  shapes: string[] = [
    'Round',
    'Princess',     
    'Cushion',            
    'Emerald',        
    'Asscher',          
    'Marquise',          
    'Pear'    
  ]

  constructor(private api: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.api.getAllProducts().subscribe(Products => this.Products = Products);
  }

  showAllProducts(){
    this.api.getAllProducts().subscribe(Products => this.Products = Products);
  }

  Filter(someBody: { [key: string]: string} ) {
    this.api.reaplyFilter(someBody).subscribe(res => this.Products = res)
  }

  showItemPage(productToAdd: Product) {
    console.log(productToAdd)
    this.router.navigate(['/display-product', productToAdd])
  }

  showTypeCategory(){
    this.typeCategory = !this.typeCategory
  }
  showShapeCategory(){
    this.shapeCategory = !this.shapeCategory
  }

}