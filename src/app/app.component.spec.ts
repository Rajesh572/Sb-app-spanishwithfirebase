import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {} from 'jasmine';
import { MyApp } from './app.component';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
} from '../../test-config/mocks-ionic';
import { PluginService } from './plugins.service';
import { ContainerService } from '../core';

describe('MyApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        PluginService,ContainerService,
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
  });

  it ('should create a valid instance of MyApp', () => {
    expect(component instanceof MyApp).toBe(true);
});



});
