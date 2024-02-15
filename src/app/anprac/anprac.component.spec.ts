import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnpracComponent } from './anprac.component';

describe('AnpracComponent', () => {
  let component: AnpracComponent;
  let fixture: ComponentFixture<AnpracComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnpracComponent]
    });
    fixture = TestBed.createComponent(AnpracComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
