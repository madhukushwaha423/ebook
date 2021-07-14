import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookuploadComponent } from './bookupload.component';

describe('BookuploadComponent', () => {
  let component: BookuploadComponent;
  let fixture: ComponentFixture<BookuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
