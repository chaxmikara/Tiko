import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingupClientComponent } from './singup-client.component';

describe('SingupClientComponent', () => {
  let component: SingupClientComponent;
  let fixture: ComponentFixture<SingupClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingupClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingupClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
