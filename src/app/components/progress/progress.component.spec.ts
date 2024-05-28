import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ProgressComponent } from './progress.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProgressComponent', () => {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set progress correctly', fakeAsync(() => {
    component.value = 50;
    component.ngOnInit();
    tick(70 * 10); // Avança o tempo em 700ms (70ms * 10 ticks)
    expect(component.progress).toBeLessThanOrEqual(0.5);
    tick(70 * 10); // Avança o tempo em mais 700ms
    expect(component.progress).toBeCloseTo(0.5, 1);
  }));

  it('should not exceed the value', fakeAsync(() => {
    component.value = 75;
    component.ngOnInit();
    tick(70 * 16); // Avança o tempo em 1120ms (70ms * 16 ticks)
    expect(component.progress).toBeGreaterThanOrEqual(0.75);
    tick(70 * 4); // Avança o tempo em mais 280ms
    expect(component.progress).toBeCloseTo(0.75, 1);
  }));
});
