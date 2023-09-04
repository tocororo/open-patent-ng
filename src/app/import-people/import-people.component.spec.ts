import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImportPeopleComponent } from './import-people.component';

describe('ImportPeopleComponent', () => {
  let component: ImportPeopleComponent;
  let fixture: ComponentFixture<ImportPeopleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
