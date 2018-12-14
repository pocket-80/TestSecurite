import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsCloneComponent } from './produits-clone.component';

describe('MatieresCloneComponent', () => {
  let component: ProduitsCloneComponent;
  let fixture: ComponentFixture<ProduitsCloneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduitsCloneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitsCloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
