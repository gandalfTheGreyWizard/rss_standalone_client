import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundContent } from './playground-content';

describe('PlaygroundContent', () => {
  let component: PlaygroundContent;
  let fixture: ComponentFixture<PlaygroundContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaygroundContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaygroundContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
