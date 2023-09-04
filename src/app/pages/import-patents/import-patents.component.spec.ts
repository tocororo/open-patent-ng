import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPatentsComponent } from './import-patents.component';

describe('ImportPatentsComponent', () => {
  let component: ImportPatentsComponent;
  let fixture: ComponentFixture<ImportPatentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportPatentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportPatentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
