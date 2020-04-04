import { Product, Item } from './../models/product.interface';
import { Observable, forkJoin } from "rxjs";
import { StockInventoryService } from './../services/stock-inventory.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray ,Validators} from '@angular/forms';
import { StockValidators } from './stock-inventory.validator';


@Component({
  selector: 'app-stock-inventory',
  templateUrl: './stock-inventory.component.html',
  styleUrls: ['./stock-inventory.component.scss']
})
export class StockInventoryComponent implements OnInit {

  products:Product[];
  total:number;
  productMap:Map<number,Product>;

  constructor(private fb:FormBuilder,private stockService:StockInventoryService) { }

  ngOnInit() {
    const cart=this.stockService.getCartItems();
    const products=this.stockService.getProducts();
    
    forkJoin([cart, products]).subscribe(([cart,products]:[Item[],Product[]])=>{
      const myMap=products.map<[number,Product]>(product=>[product.id,product]);
      this.productMap=new Map<number,Product>(myMap);
      this.products=products;
      cart.forEach(item=>this.addStock(item));
       
      this.calculateTotal(this.form.get('stock').value);
      this.form.get('stock').valueChanges.subscribe(value=>this.calculateTotal(value));
    });
  }

  form=this.fb.group({
    store:this.fb.group({
      branch:['',[Validators.required,StockValidators.checkBranch]],
      code:['',Validators.required]
    }),
    selector:this.createStock({}),
    stock:this.fb.array([])
  })

  calculateTotal(value:Item[]){
    const total=value.reduce((prev,next)=>{
      return prev + (next.quantity * this.productMap.get(next.product_id).price); 
    },0);
    this.total=total;
  }

  createStock(stock){
    return this.fb.group({
      product_id:parseInt(stock.product_id,10) || '',
      quantity:stock.quantity || 10
    });
  }

  onSubmit(){
    console.log('Submit:',this.form.value);
  }

  addStock(stock){
    const control=this.form.get('stock') as FormArray;
    control.push(this.createStock(stock));
  }

  removeStock({group,index}:{group:FormGroup,index:number}){
    const control=this.form.get('stock') as FormArray;
    control.removeAt(index);
  }

}
