import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SucursalesComponent } from './sucursales.component';

describe('SucursalesComponent', () => {
  let component: SucursalesComponent;
  let fixture: ComponentFixture<SucursalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
