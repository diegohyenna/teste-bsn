import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { InfiniteScrollComponent } from './infinite-scroll.component';

describe('InfiniteScrollComponent', () => {
  let component: InfiniteScrollComponent;
  let fixture: ComponentFixture<InfiniteScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfiniteScrollComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollComponent);
    component = fixture.componentInstance;
    component.generateItemsEvent = new EventEmitter<'load' | 'initialize'>();
    component.handleRefreshEvent = new EventEmitter<boolean>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit generateItemsEvent on onIonInfinite call', () => {
    spyOn(component.generateItemsEvent, 'emit');
    const mockEvent = {
      target: {
        complete: jasmine.createSpy('complete'),
      },
    } as any;

    component.onIonInfinite(mockEvent);
    expect(component.generateItemsEvent.emit).toHaveBeenCalledWith('load');
    expect(component.ev).toBe(mockEvent);
  });

  it('should call complete on event target when loading changes', () => {
    const mockEvent = {
      target: {
        complete: jasmine.createSpy('complete'),
      },
    } as any;

    component.ev = mockEvent;
    component.loading = true;
    component.ngOnChanges({
      loading: {
        currentValue: false,
        previousValue: true,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(mockEvent.target.complete).toHaveBeenCalled();
  });

  it('should emit handleRefreshEvent and generateItemsEvent on handleRefresh call', (done) => {
    spyOn(component.handleRefreshEvent, 'emit');
    spyOn(component.generateItemsEvent, 'emit');

    const mockEvent = {
      target: {
        complete: jasmine.createSpy('complete'),
      },
    };

    component.handleRefresh(mockEvent);

    expect(component.handleRefreshEvent.emit).toHaveBeenCalledWith(true);

    setTimeout(() => {
      expect(component.handleRefreshEvent.emit).toHaveBeenCalledWith(false);
      expect(component.generateItemsEvent.emit).toHaveBeenCalledWith(
        'initialize'
      );
      expect(mockEvent.target.complete).toHaveBeenCalled();
      done();
    }, 2000);
  });
});
