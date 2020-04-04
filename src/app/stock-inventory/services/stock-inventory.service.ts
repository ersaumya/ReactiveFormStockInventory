import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Product, Item } from "../models/product.interface";

@Injectable({
  providedIn: "root"
})
export class StockInventoryService {
  constructor(private httpClient: HttpClient) {}

  getCartItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>("http://localhost:3000/cart").pipe(
      map(res => res),
      catchError((error: any) => Observable.throw(error.json()))
    );
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>("http://localhost:3000/products")
      .pipe(
        map(res => res),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }

  checkBranchId(id: string): Observable<boolean> {
    let search = new HttpParams().set('id', id);
    return this.httpClient
      .get("http://localhost:3000/branches", {params:search})
      .pipe(
        map(res => res),
        map((res: any[]) => !!res.length),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }
}
