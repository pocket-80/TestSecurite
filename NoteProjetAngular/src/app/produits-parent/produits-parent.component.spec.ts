import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsParentComponent } from './produits-parent.component';

describe('ProduitsParentComponent', () => {
  let component: ProduitsParentComponent;
  let fixture: ComponentFixture<ProduitsParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduitsParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitsParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
