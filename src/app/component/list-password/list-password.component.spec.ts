import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPasswordComponent } from './list-password.component';

describe('ListPasswordComponent', () => {
  let component: ListPasswordComponent;
  let fixture: ComponentFixture<ListPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
