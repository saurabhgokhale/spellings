import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PracticeComponent } from './practice/practice.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PracticeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot ([
      //Routes accessible to anonymous users
      { path: '', component: HomeComponent },
      { path: 'practice', component: PracticeComponent },
      { path: '**', redirectTo: '/', pathMatch: 'full' } /* Default route to catch any wrong routes */
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
