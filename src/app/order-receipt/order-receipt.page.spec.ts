import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderReceiptPage } from './order-receipt.page';

describe('OrderReceiptPage', () => {
  let component: OrderReceiptPage;
  let fixture: ComponentFixture<OrderReceiptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderReceiptPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderReceiptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
