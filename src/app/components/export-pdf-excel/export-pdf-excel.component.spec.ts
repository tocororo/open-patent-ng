import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportPdfExcelComponent } from './export-pdf-excel.component';

describe('ExportPdfExcelComponent', () => {
  let component: ExportPdfExcelComponent;
  let fixture: ComponentFixture<ExportPdfExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportPdfExcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportPdfExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
