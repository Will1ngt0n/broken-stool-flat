import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyDOthq8-7ipC4rQYCh_R8_oC9fL0F0Oz5g",
  authDomain: "fir-crud-11c1f.firebaseapp.com",
  databaseURL: "https://fir-crud-11c1f.firebaseio.com",
  projectId: "fir-crud-11c1f",
  storageBucket: "fir-crud-11c1f.appspot.com",
  messagingSenderId: "704929489176",
  appId: "1:704929489176:web:334d209d3679ed5d8a3e6d",
  measurementId: "G-BYBG8HFL6W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
