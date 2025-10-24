import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {


  constructor() {}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  initCanvas(): void {
    // Initialize your canvas here
    // Make sure to create the canvas and set its initial properties
  }

  draw(): void {
    // Implement your drawing logic here
  }

  
}
