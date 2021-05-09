import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { WordItemComponent } from './components/word-item/word-item.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { YesNoDialogComponent } from './components/yes-no-dialog/yes-no-dialog.component';
import { ButtonMenuSelectComponent } from './components/button-menu-select/button-menu-select.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';

const matModules = [
  MatButtonModule,
  MatInputModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatDialogModule,
  MatFormFieldModule,
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    WordItemComponent,
    MenuButtonComponent,
    YesNoDialogComponent,
    ButtonMenuSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...matModules
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  entryComponents: [YesNoDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
