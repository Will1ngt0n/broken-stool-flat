import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WinterGearPage } from './winter-gear.page';

describe('WinterGearPage', () => {
  let component: WinterGearPage;
  let fixture: ComponentFixture<WinterGearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinterGearPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WinterGearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
