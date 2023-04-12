import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header.component';
import { SidebarComponent } from './layout/sidebar.component';
import { ContentComponent } from './layout/content.component';
import { FooterComponent } from './layout/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { FromEventRxjsComponent } from './components/rxjs/from-event.rxjs.component';
import { FromEventSignalComponent } from './components/signal/from-event.signal.component';
import { HttpRxjsComponent } from './components/rxjs/http.rxjs.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'from-event/rxjs', component: FromEventRxjsComponent },
  { path: 'http/rxjs', component: HttpRxjsComponent },
  { path: 'from-event/signal', component: FromEventSignalComponent },
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
    FromEventSignalComponent,
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
