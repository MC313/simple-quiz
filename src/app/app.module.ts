import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuoteCardComponent } from './quote-card/quote-card.component';
import { TopicsComponent } from './topics/topics.component';

@NgModule({
  declarations: [AppComponent, QuoteCardComponent, TopicsComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [QuoteCardComponent]
})
export class AppModule {}
