import { AuthService } from './services/auth.service';
import { AccountService } from './services/account.service';
import { SelectDropdownComponent } from './ui/select-dropdown/select-dropdown.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HomeComponent} from './pages/home/home.component';
import {DetailsComponent} from './pages/details/details.component';
import {HttpClientModule} from '@angular/common/http';
import {WeatherCardComponent} from './ui/weather-card/weather-card.component';
import {AddCardComponent} from './ui/add-card/add-card.component';

import {AddComponent} from './pages/add/add.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {ErrorComponent} from './ui/error/error.component';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {FormsModule} from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    WeatherCardComponent,
    AddCardComponent,
    AddComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    SelectDropdownComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    NguiAutoCompleteModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js')
  ],providers:[ AccountService, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
