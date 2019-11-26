import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PendingOrderPage } from './pending-order.page';

describe('PendingOrderPage', () => {
  let component: PendingOrderPage;
  let fixture: ComponentFixture<PendingOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PendingOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
