import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarPatenteComponent } from './solicitar-patente.component';

describe('SolicitarPatenteComponent', () => {
  let component: SolicitarPatenteComponent;
  let fixture: ComponentFixture<SolicitarPatenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarPatenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarPatenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
