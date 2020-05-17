import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopOverControllerPage } from './pop-over-controller.page';

describe('PopOverControllerPage', () => {
  let component: PopOverControllerPage;
  let fixture: ComponentFixture<PopOverControllerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopOverControllerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopOverControllerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
