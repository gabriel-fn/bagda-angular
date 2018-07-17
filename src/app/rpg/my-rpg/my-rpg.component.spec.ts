import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRpgComponent } from './my-rpg.component';

describe('MyRpgComponent', () => {
  let component: MyRpgComponent;
  let fixture: ComponentFixture<MyRpgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRpgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
