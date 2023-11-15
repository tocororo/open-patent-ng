import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpCComponent } from './help-c.component';

describe('HelpCComponent', () => {
  let component: HelpCComponent;
  let fixture: ComponentFixture<HelpCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
