import { Component, computed, input, OnChanges } from '@angular/core';
import { GenericInterface } from '../../dtos/rss-parser-dtos';


@Component({
  selector: 'app-playground-content',
  imports: [],
  templateUrl: './playground-content.html',
  styleUrl: './playground-content.scss',
})
export class PlaygroundContent implements OnChanges {
  playgroundInput = input<GenericInterface>({});
  playgroundObject = "";

  ngOnChanges() {
    this.playgroundObject = JSON.stringify(this.playgroundInput());
    console.log(`value changes`, this.playgroundInput());
  }
}
