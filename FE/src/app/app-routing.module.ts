import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { MainComponent } from './main/main.component';
import { GemstoneComponent } from './gemstone/gemstone.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path:'', component: MainComponent},
  {path:'about', component: AboutUsComponent},
  {path:'contact-us', component: ContactComponent},
  {path:'jewelry', component: GemstoneComponent},
  {path:'display-product', component: ItemPageComponent},
  {path:'cart', component: CartComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }