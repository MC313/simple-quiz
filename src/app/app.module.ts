import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {
  AmplifyAngularModule,
  AmplifyService,
  AmplifyModules
} from 'aws-amplify-angular';
import API from '@aws-amplify/api';

import { AppComponent } from './app.component';
import { QuoteCardComponent } from './quote-card/quote-card.component';
import { TopicsComponent } from './topics/topics.component';
import { LoadingIconComponent } from './loading-icon/loading-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    QuoteCardComponent,
    TopicsComponent,
    LoadingIconComponent
  ],
  imports: [
    AmplifyAngularModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: AmplifyService,
      useFactory: () => {
        return AmplifyModules({ API });
      }
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [QuoteCardComponent]
})
export class AppModule {}
