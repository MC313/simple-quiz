import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  AmplifyAngularModule,
  AmplifyService,
  AmplifyModules
} from 'aws-amplify-angular';
import API from '@aws-amplify/api';

import { AppComponent } from './app.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { HomeComponent } from './home/home.component';
import { InviteComponent } from './app-menu/invite.component';
import { LoadingIconComponent } from './loading-icon/loading-icon.component';
import { QuoteCardComponent } from './quote-card/quote-card.component';
import { FnScoreboardComponent } from './fn-scoreboard/fn-scoreboard.component';
import { TopicsComponent } from './topics/topics.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    QuoteCardComponent,
    TopicsComponent,
    LoadingIconComponent,
    FnScoreboardComponent,
    HomeComponent,
    AppMenuComponent,
    InviteComponent
  ],
  imports: [
    AmplifyAngularModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: AmplifyService,
      useFactory: () => {
        return AmplifyModules({ API });
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
