import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { WishService } from 'src/app/services/wish.service';
import {  faHeart, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public bookList: any;

    faHeart = faHeart;
    faPlus = faPlus;
    faMinus = faMinus;
    

  constructor(private api: ApiService, private cartService : CartService, private wishListService: WishService
    ) { }

  ngOnInit(): void {
    this.api.getBooks()
    .subscribe(res =>{
      this.bookList = res;

      this.bookList.forEach((a:any)=> {
        Object.assign(a,{quantity:1,total:a.price});
       
      })
    })

    console.log(this.bookList.coverFileName)
  }

 addToCart(book : any){
 this.cartService.addtoCart(book);
 this.cartNumberFunc();
 }



 public wishItemList : any = [];
 addWishList(product : any){
  // this.cartItemList.push(product);
  // this.productList.next(this.cartItemList);
  // this.getTotalPrice();
  // console.log(this.cartItemList);
   
  

  ///seperate
 
  
  let cartDataNull = localStorage.getItem('wishItemList');
  if(cartDataNull == null){
   let storeDateGet: any = [];
   storeDateGet.push(product);
   localStorage.setItem('wishItemList',JSON.stringify(storeDateGet));
  }

  else{
    var id = product.bookId;
    let index: number = -1;
    this.wishItemList = JSON.parse(localStorage.getItem('wishItemList') as string) ;
    for(let i=0; i<this.wishItemList.length; i++){
      if(parseInt(id) === parseInt(this.wishItemList[i].bookId)){
      this.wishItemList[i].quantity = product.quantity;
      index = i;
      break;
      }
    }
      if(index == -1){
        this.wishItemList.push(product);
        localStorage.setItem('wishItemList', JSON.stringify(this.wishItemList));
      }
      else{
        localStorage.setItem('wishItemList', JSON.stringify(this.wishItemList));
      }
      
    }
    
    this.wishNumberFunc(); 
}


  inc(book: any){
  // console.log(book.quantity)
  if(book.quantity != 5){
    book.quantity = book.quantity + 1
   }
  }
  dec(book: any){
    // console.log(book.quantity)
    if(book.quantity != 1){
      book.quantity = book.quantity + 1
    
    }
    }



    cartNumber: number = 0;
    cartNumberFunc(){
      var cartValue = JSON.parse(localStorage.getItem('localCart') as string) ;
     this.cartNumber= cartValue.length;
      this.cartService.cartSubject.next(this.cartNumber);

    }

    
    wishNumber: number = 0;
    wishNumberFunc(){
      var cartValue = JSON.parse(localStorage.getItem('wishItemList') as string) ;
      this.wishNumber=cartValue.length;
      this.cartService.wishSubject.next(this.wishNumber);

    }



}
