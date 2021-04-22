import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryInfoModalComponent } from './country-info-modal.component';

describe('CountryInfoModalComponent', () => {
  let component: CountryInfoModalComponent;
  let fixture: ComponentFixture<CountryInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryInfoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
