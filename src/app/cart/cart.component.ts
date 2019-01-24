import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  b:object[]=[];
  data:object[]=[];
  constructor(private ds:DataService, private cart:CartService) {
    this.b=this.ds.sendToCart();
    this.data.push(this.b);
   }

  ngOnInit() {
    
    //getting data from cart
    this.cart.sendCartdata().subscribe(temp=>{this.data=temp})
  }
  
  

}
