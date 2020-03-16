import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-stock-inventory',
  templateUrl: './stock-inventory.component.html',
  styleUrls: ['./stock-inventory.component.scss']
})
export class StockInventoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  form=new FormGroup({
    store:new FormGroup({
      branch:new FormControl('SBI078'),
      code:new FormControl('1245')
    })
  })

  onSubmit(){
    console.log('Submit:',this.form.value);
  }

}
