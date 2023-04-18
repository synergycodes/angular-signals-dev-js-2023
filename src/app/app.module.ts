import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header.component';
import { SidebarComponent } from './layout/sidebar.component';
import { ContentComponent } from './layout/content.component';
import { FooterComponent } from './layout/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { FromEventRxjsComponent } from './components/rxjs/from-event.rxjs.component';
import { HttpRxjsComponent } from './components/rxjs/http.rxjs.component';
import { SearchDebounceRxjsComponent } from './components/rxjs/search-debounce.rxjs.component';
import { ExchangeRatesRxjsComponent } from './components/rxjs/exchange-rates.rxjs.component';
import { FromEventSignalComponent } from './components/signal/from-event.signal.component';
import { HttpSignalComponent } from './components/signal/http.signal.component';
import { SearchDebounceSignalComponent } from './components/signal/search-debounce.signal.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'from-event/rxjs', component: FromEventRxjsComponent },
  { path: 'http/rxjs', component: HttpRxjsComponent },
  { path: 'search-debounce/rxjs', component: SearchDebounceRxjsComponent },
  { path: 'exchange-rates/rxjs', component: ExchangeRatesRxjsComponent },
  { path: 'from-event/signal', component: FromEventSignalComponent },
  { path: 'http/signal', component: HttpSignalComponent },
  { path: 'search-debounce/signal', component: SearchDebounceSignalComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent,
    HomeComponent,
    FromEventRxjsComponent,
    HttpRxjsComponent,
    SearchDebounceRxjsComponent,
    ExchangeRatesRxjsComponent,
    FromEventSignalComponent,
    HttpSignalComponent,
    SearchDebounceSignalComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
