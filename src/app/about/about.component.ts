import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent extends MenuComponent{
  // @ViewChild('canvas', { static: true }) canvasRef: ElementRef;
  // private canvas: HTMLCanvasElement;
  // private ctx: CanvasRenderingContext2D;
  // private requestId: number;
  // private t: number = 0;
  // private inc: number = 3;
  // private stopped: boolean = true;

  // constructor() {}

  // ngOnInit(): void {
  //   this.canvas = this.canvasRef.nativeElement;
  //   this.ctx = this.canvas.getContext('2d');
  //   this.initCanvas();
  //   this.startAnimation();
  // }

  // ngOnDestroy(): void {
  //   cancelAnimationFrame(this.requestId);
  // }

  // initCanvas(): void {
  //   // Initialize your canvas here
  //   // Make sure to create the canvas and set its initial properties
  // }

  // draw(): void {
  //   // Implement your drawing logic here
  // }

  // startAnimation(): void {
  //   this.stopped = !this.stopped;
  //   if (!this.stopped) {
  //     this.animate();
  //   }
  // }

  // animate(): void {
  //   if (this.stopped) {
  //     return;
  //   }
  //   this.t += this.inc;
  //   if (!this.draw() || this.t < 0) {
  //     if (this.inc === 3) {
  //       this.inc = -8;
  //     } else {
  //       this.ctx.strokeStyle = `hsla(${this.getRandomInt(0, 360)}, 90%, 60%, 0.6)`;
  //       this.inc = 3;
  //       this.t = 0;
  //       // Reset and reinitialize your canvas if needed
  //     }
  //   }
  //   this.requestId = requestAnimationFrame(() => this.animate());
  // }

  // getRandomInt(min: number, max: number): number {
  //   return Math.floor(Math.random() * (max - min)) + min;
  // }
}
