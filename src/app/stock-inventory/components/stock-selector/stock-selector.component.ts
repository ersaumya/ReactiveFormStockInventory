import { Product } from './../../models/product.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stock-selector',
  templateUrl: './stock-selector.component.html',
  styleUrls: ['./stock-selector.component.scss']
})
export class StockSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() parent: FormGroup;

  @Input() products:Product[];

  @Output() added=new EventEmitter<any>();

  onAdd(){
    this.added.emit(this.parent.get('selector').value);
  }

}
