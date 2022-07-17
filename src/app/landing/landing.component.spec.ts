import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './landing.component';
import {LoginService} from '../login/login.service';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AptBookingService } from '../apt-booking/apt-booking.service';
describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingComponent ],
      imports:[HttpClientModule],
      providers:[HttpClient, LoginService, Router, AptBookingService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
