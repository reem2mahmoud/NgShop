import { async, TestBed } from '@angular/core/testing';
import { CategoriesModule } from './categories.module';

describe('CategoriesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CategoriesModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(CategoriesModule).toBeDefined();
  });
});
