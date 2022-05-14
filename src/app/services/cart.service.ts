import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any = [];
  public productList = new BehaviorSubject<any>([]);

  cartSubject = new Subject<any>();
  wishSubject = new Subject<any>();


  constructor() { }

  // getProducts(){
  //  return this.productList.asObservable();
  // }

  // setProducts(product : any){
  //  this.cartItemList.push(...product);
  //  this.productList.next(product);
  // }

  addtoCart(product : any){
    // this.cartItemList.push(product);
    // this.productList.next(this.cartItemList);
    // this.getTotalPrice();
    // console.log(this.cartItemList);
     
    

    ///seperate
   
    let cartDataNull = localStorage.getItem('localCart');
    if(cartDataNull == null){
     let storeDateGet: any = [];
     storeDateGet.push(product);
     localStorage.setItem('localCart',JSON.stringify(storeDateGet));
    }

    else{
      var id = product.bookId;
      let index: number = -1;
      this.cartItemList = JSON.parse(localStorage.getItem('localCart') as string) ;
      for(let i=0; i<this.cartItemList.length; i++){
        if(parseInt(id) === parseInt(this.cartItemList[i].bookId)){
        this.cartItemList[i].quantity = product.quantity;
        index = i;
        break;
        }
      }
        if(index == -1){
          this.cartItemList.push(product);
          localStorage.setItem('localCart', JSON.stringify(this.cartItemList));
        }
        else{
          localStorage.setItem('localCart', JSON.stringify(this.cartItemList));
        }
      }
       
  }

 

  // getTotalPrice() : number{
  //   let grandTotal = 0;
    
  //   this.cartItemList.map((a: any)=>{
  //     grandTotal += a.total ;
  //   })
  //   return grandTotal;
  // }



  // removeCartItem(product : any){
  //   this.cartItemList.splice(index,1);
  //   this.productList.next(this.cartItemList);
  //  this.cartItemList.map((a: any, index: any)=>{
  //    if(product.id ===a.id){
  //      this.cartItemList.splice(index,1);
  //    }
  //  })
  // }

//   removeAllCart(){
//     this.cartItemList = []
//     this.productList.next(this.cartItemList);
//   }
  
  
// }




// function index(index: any, arg1: number) {
//   throw new Error('Function not implemented.');
}

