import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthInterceptor} from "./auth/auth.interceptor";
import {HomeComponent} from './pages/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ToastService} from "./services/toastService";
import {ErrorComponent} from './pages/error-rediction/error/error.component';
import {UnauthorizedComponent} from './pages/error-rediction/unauthorized/unauthorized.component';
import {RgpdComponent} from './pages/information/rgpd/rgpd.component';
import {NgOptimizedImage} from "@angular/common";
import {SharedModule} from "./shared/shared.module";
import {ContactComponent} from "./pages/information/contact/contact.component";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    UnauthorizedComponent,
    RgpdComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatCardModule,
    FontAwesomeModule,
    NgOptimizedImage,
    SharedModule,
  ],
  exports: [MatButtonModule, MatCheckboxModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
