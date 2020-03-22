import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockInventoryModule } from './stock-inventory/stock-inventory.module';
import { HttpClientModule } from '@angular/common/http';
import { StockInventoryService } from './stock-inventory/services/stock-inventory.service';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StockInventoryModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [StockInventoryService],
  bootstrap: [AppComponent]
})
export class AppModule {}
