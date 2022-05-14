import { Component, OnInit } from '@angular/core';
import { WishService } from 'src/app/services/wish.service';
import { faTrash, faHeart} from '@fortawesome/free-solid-svg-icons';
import { CartComponent } from '../cart/cart.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  public products : any = [];
  

  faTrash = faTrash;
  faHeart = faHeart;

  constructor(private wishlistService : WishService, private cartService: CartService) { }

  ngOnInit(): void {
    this.wishDetails();
  
  }
  getWishDetails : any = [];
  wishDetails(){
    if(localStorage.getItem('wishItemList')){
    this.getWishDetails = JSON.parse(localStorage.getItem('wishItemList') as string);
    console.log(this.getWishDetails) ;
    }
  }


  removewishItem(item: any){
    if(localStorage.getItem('wishItemList')){
      this.getWishDetails = JSON.parse(localStorage.getItem('wishItemList') as string);
      for(let i=0; i<this.getWishDetails.length; i++){
     if(this.getWishDetails[i].bookId === item.bookId){
       this.getWishDetails.splice(i, 1);
       localStorage.setItem('wishItemList', JSON.stringify(this.getWishDetails));
      this.wishNumberFunc();
     }
      }
    }
  }

  emptywish(){
    localStorage.removeItem('wishItemList');
    this.getWishDetails =[];
    this.cartService.wishSubject.next(this.wishNumber);
    
    
  }

  wishNumber: number = 0;
  wishNumberFunc(){
    var cartValue = JSON.parse(localStorage.getItem('wishItemList') as string) ;
    this.wishNumber=cartValue.length;
    this.cartService.wishSubject.next(this.wishNumber);

  }

  

  addtoCart(book : any){
    this.cartService.addtoCart(book);
   
   this.cartNumberFunc();
    }

    cartNumber : number = 0;
    cartNumberFunc(){
      var cartValue = JSON.parse(localStorage.getItem('localCart') as string ) ;
      this.cartNumber = cartValue.length;
      this.cartService.cartSubject.next(this.cartNumber);
     
    }



}
