import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import {
  AmplifyAngularModule,
  AmplifyService,
  AmplifyModules
} from 'aws-amplify-angular';
import API from '@aws-amplify/api';

import { AppComponent } from './app.component';
import { QuoteCardComponent } from './quote-card/quote-card.component';
import { HomeComponent } from './home/home.component';
import { FnScoreboardComponent } from './fn-scoreboard/fn-scoreboard.component';
import { LoadingIconComponent } from './loading-icon/loading-icon.component';
import { TopicsComponent } from './topics/topics.component';
import { AppRoutingModule } from './app-routing.module';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { AppMenuButtonComponent } from './app-menu/app-menu-button.component';


@NgModule({
  declarations: [
    AppComponent,
    QuoteCardComponent,
    TopicsComponent,
    LoadingIconComponent,
    FnScoreboardComponent,
    HomeComponent,
    AppMenuComponent,
    AppMenuButtonComponent
  ],
  imports: [
    AmplifyAngularModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
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
