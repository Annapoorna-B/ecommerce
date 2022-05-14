import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrash, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  faTrash = faTrash;
  faPlus = faPlus ;
  faMinus = faMinus ;

  public products : any = [];
 
  

  constructor(private router: Router, private cartService : CartService) { }

  ngOnInit(): void {
    this.cartDetails();
    this.loadcart();
    

    // this.cartService.getProducts()
    // .subscribe(res => {
    //   this.products = res;
    //   this.grandTotal = this.cartService.getTotalPrice()
    // })
  }
   getCartDetails : any = [];
  cartDetails(){
    if(localStorage.getItem('localCart')){
    this.getCartDetails = JSON.parse(localStorage.getItem('localCart') as string);
    console.log(this.getCartDetails) ;
    }
  }

  startShoping(){
    this.router.navigateByUrl('/home');
  }

  removeItem(item: any){
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart') as string);
      for(let i=0; i<this.getCartDetails.length; i++){
     if(this.getCartDetails[i].bookId === item.bookId){
       this.getCartDetails.splice(i, 1);
       localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
       this.loadcart();
       this.cartNumberFunc()
     }
      }
    }
  }


  cartNumber : number = 0;
 cartNumberFunc(){
   var cartValue = JSON.parse(localStorage.getItem('localCart') as string ) ;
   this.cartNumber = cartValue.length;
   this.cartService.cartSubject.next(this.cartNumber);
  
 }
 

  emptyCart(){
    localStorage.removeItem('localCart');
    this.getCartDetails =[];
    this.cartService.cartSubject.next(this.cartNumber);
  }

 
  incQnt(bookId: any, quantity: any){
  for( let i=0; i<this.getCartDetails.length; i++){
    if(this.getCartDetails[i].bookId === bookId){
      if(quantity != 5)
      this.getCartDetails[i].quantity = parseInt(quantity) + 1;
    }
  }
  localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
  this.loadcart();
  }

  
   decQnt(bookId: any, quantity: any){
    for( let i=0; i<this.getCartDetails.length; i++){
      if(this.getCartDetails[i].bookId === bookId){
        if(quantity != 1)
        this.getCartDetails[i].quantity = parseInt(quantity) - 1;
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.loadcart();
    }

    grandTotal: number = 0;
    loadcart(){
      if(localStorage.getItem('localCart')){
        this.getCartDetails = JSON.parse(localStorage.getItem('localCart') as string);
        this.grandTotal = this.getCartDetails.reduce(function(acc: any, val: any){
        return acc + (val.price * val.quantity);
        }, 0)
      }


      
    }


 

 

}
