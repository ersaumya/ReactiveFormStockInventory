import { Product } from "./../../models/product.interface";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-stock-selector",
  templateUrl: "./stock-selector.component.html",
  styleUrls: ["./stock-selector.component.scss"]
})
export class StockSelectorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() parent: FormGroup;

  @Input() products: Product[];

  @Output() added = new EventEmitter<any>();

  get notSelected(){
    return (
      !this.parent.get('selector.product_id').value
    );
  }

  get stockExists() {
    return (
      this.parent.hasError("stockExists") &&
      this.parent.get("selector.product_id").dirty 
    );
  }

  onAdd() {
    this.added.emit(this.parent.get("selector").value);
    //use .patchValue({product_id:''})------>to change particular formcontrol(partial value)
    //use .setValue({product_id:'',quantity:10})------->to set all the formcontrol in the form
    this.parent.get("selector").reset({
      product_id: "",
      quantity: 10
    });
  }
}
