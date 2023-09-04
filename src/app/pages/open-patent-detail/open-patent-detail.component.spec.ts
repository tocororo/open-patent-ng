import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPatentDetailComponent } from './open-patent-detail.component';

describe('OpenPatentDetailComponent', () => {
  let component: OpenPatentDetailComponent;
  let fixture: ComponentFixture<OpenPatentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenPatentDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenPatentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
