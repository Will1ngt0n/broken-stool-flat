import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SummerGearPage } from './summer-gear.page';

describe('SummerGearPage', () => {
  let component: SummerGearPage;
  let fixture: ComponentFixture<SummerGearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummerGearPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SummerGearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
