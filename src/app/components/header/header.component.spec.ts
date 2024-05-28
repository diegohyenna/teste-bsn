import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let navControllerSpy: jasmine.SpyObj<NavController>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('NavController', [
      'navigateForward',
      'back',
    ]);

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: NavController, useValue: spy }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    navControllerSpy = TestBed.inject(
      NavController
    ) as jasmine.SpyObj<NavController>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.title = 'Test Title';
    component.buttonBack = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('ion-title').innerHTML).toContain(
      'Test Title'
    );
  });

  it('should navigate to favorite page on goToFavoritePage call', () => {
    component.goToFavoritePage();
    expect(navControllerSpy.navigateForward).toHaveBeenCalledWith(
      'folder/favorite'
    );
  });

  it('should navigate back on goBack call', () => {
    component.goBack();
    expect(navControllerSpy.back).toHaveBeenCalled();
  });

  it('should display back button when buttonBack is true', () => {
    const compiled = fixture.nativeElement;
    const backButton = compiled.querySelector('.back-button');
    expect(backButton).toBeTruthy();
  });

  it('should not display back button when buttonBack is false', () => {
    component.buttonBack = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const backButton = compiled.querySelector('.back-button');
    expect(backButton).toBeNull();
  });
});
