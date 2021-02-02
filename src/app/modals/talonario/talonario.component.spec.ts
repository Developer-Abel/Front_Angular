import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalonarioComponent } from './talonario.component';

describe('TalonarioComponent', () => {
  let component: TalonarioComponent;
  let fixture: ComponentFixture<TalonarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalonarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalonarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
