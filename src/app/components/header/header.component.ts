import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBook, faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faBook = faBook;
  faCartShopping = faCartShopping;
  faHeart = faHeart;

  cartItem : number = 0;

  public wishTotalItem : number = 0;
  

  constructor(private router: Router, private cartService: CartService, private wishService: WishService) { 
   this.cartService.cartSubject.subscribe((data: any)=>{
     this.cartItem = data;
   });

   this.cartService.wishSubject.subscribe((data: any)=>{
    this.wishTotalItem = data;
  });
   
  }

  ngOnInit(): void {
   this.cartItemFunc();
   this.wishItemFunc()
  }

  openCart(){
    this.router.navigateByUrl('/cart');
  }
  openhome(){
    this.router.navigateByUrl('/home');
  }

  cartItemFunc(){
    if(localStorage.getItem('localCart') != null){
      var cartcount = JSON.parse(localStorage.getItem('localCart') as string);
     this.cartItem = cartcount.length;
    

    }
  }

  
  wishItemFunc(){
    if(localStorage.getItem('wishItemList') != null){
      var wishcount = JSON.parse(localStorage.getItem('wishItemList') as string);
     this.wishTotalItem = wishcount.length;

    }
  }
}
