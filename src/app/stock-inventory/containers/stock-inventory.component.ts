import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Product } from '../models/product.interface';

@Component({
  selector: 'app-stock-inventory',
  templateUrl: './stock-inventory.component.html',
  styleUrls: ['./stock-inventory.component.scss']
})
export class StockInventoryComponent implements OnInit {

  products:Product[]=[
    { "id": 1, "price":100000, "name": "Macbook air" },
    { "id": 2, "price": 32000, "name": "Lenovo thinkpad" },
    { "id": 3, "price": 40000, "name": "Hp Pavilion" },
    { "id": 4, "price": 35000, "name": "Acer Inspiron" },
    { "id": 5, "price": 28000, "name": "Asus Notebook" },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  form=new FormGroup({
    store:new FormGroup({
      branch:new FormControl(''),
      code:new FormControl('')
    }),
    selector:this.createStock({}),
    stock:new FormArray([
      this.createStock({product_id:1,quantity:10}),
      this.createStock({ product_id: 3, quantity: 40 })
    ])
  })

  createStock(stock){
    return new FormGroup({
      product_id:new FormControl(parseInt(stock.product_id,10) || ''),
      quantity:new FormControl(stock.quantity || 10)
    });
  }

  onSubmit(){
    console.log('Submit:',this.form.value);
  }

}
