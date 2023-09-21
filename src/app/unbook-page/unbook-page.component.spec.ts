import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbookPageComponent } from './unbook-page.component';

describe('UnbookPageComponent', () => {
  let component: UnbookPageComponent;
  let fixture: ComponentFixture<UnbookPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnbookPageComponent]
    });
    fixture = TestBed.createComponent(UnbookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
