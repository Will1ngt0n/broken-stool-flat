import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalesSpecialsPage } from './sales-specials.page';

describe('SalesSpecialsPage', () => {
  let component: SalesSpecialsPage;
  let fixture: ComponentFixture<SalesSpecialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesSpecialsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalesSpecialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
