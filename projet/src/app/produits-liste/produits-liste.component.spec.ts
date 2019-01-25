import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsListeComponent } from './produits-liste.component';

describe('ProduitsListeComponent', () => {
  let component: ProduitsListeComponent;
  let fixture: ComponentFixture<ProduitsListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduitsListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitsListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
