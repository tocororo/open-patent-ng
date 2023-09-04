import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CsvTableComponent } from './csv-table.component';

describe('CsvTableComponent', () => {
  let component: CsvTableComponent;
  let fixture: ComponentFixture<CsvTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
