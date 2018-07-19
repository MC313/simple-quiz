import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { QuoteCardComponent } from './quote-card/quote-card.component';

@NgModule({
  declarations: [AppComponent, QuoteCardComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
