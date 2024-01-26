import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductDialogComponent } from './new-product-dialog.component';

describe('NewProductDialogComponent', () => {
  let component: NewProductDialogComponent;
  let fixture: ComponentFixture<NewProductDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewProductDialogComponent]
    });
    fixture = TestBed.createComponent(NewProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
