import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CellarPage } from './cellar.page';

describe('CellarPage', () => {
  let component: CellarPage;
  let fixture: ComponentFixture<CellarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CellarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
