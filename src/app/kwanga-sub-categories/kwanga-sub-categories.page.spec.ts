import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KwangaSubCategoriesPage } from './kwanga-sub-categories.page';

describe('KwangaSubCategoriesPage', () => {
  let component: KwangaSubCategoriesPage;
  let fixture: ComponentFixture<KwangaSubCategoriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KwangaSubCategoriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KwangaSubCategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
