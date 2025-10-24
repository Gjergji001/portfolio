import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MenuserviceService } from './menuservice.service';
import { transition, trigger, useAnimation } from '@angular/animations';
import { SidebarCloseAnimation, SidebarOpenAnimation } from './animations';

const animationParams = {
  menuWidth: '250px',
  animationStyle: '500ms ease',
};

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.None, // Use None to disable encapsulation
  animations: [
    trigger('sideMenu', [
      transition(':enter', [
        useAnimation(SidebarOpenAnimation, {
          params: {
            menuWidth: animationParams.menuWidth,
            animationStyle: animationParams.animationStyle,
          },
        }),
      ]),
      transition(':leave', [
        useAnimation(SidebarCloseAnimation, {
          params: {
            ...animationParams,
          },
        }),
      ]),
    ]),
  ],
})
export class MenuComponent implements OnInit, AfterViewInit {
  ngOnInit() {}

  items: any = ['HOME', 'ABOUT', 'SERVICES', 'BLOG', 'CONTACT'];
  symbolOpeningTag: string = '</>';
  symbolClosingTag: string = '<\\>';
  accordion: boolean = true;

  // Mouse effect
  private canvas: HTMLCanvasElement | null | undefined;
  private ctx: CanvasRenderingContext2D | null | undefined;
  private mouseMoved: boolean = false;
  private mouse = {
    x: 0.5 * window.innerWidth,
    y: 0.5 * window.innerHeight,
    tX: 0,
    tY: 0,
  };
  private params = {
    pointsNumber: 40,
    widthFactor: 0.3,
    mouseThreshold: 0.6,
    spring: 0.4,
    friction: 0.5,
  };
  private touchTrail: { x: number; y: number; vx: number; vy: number }[];

  constructor(private menuService: MenuserviceService) {
    this.touchTrail = new Array(this.params.pointsNumber);
    for (let i = 0; i < this.params.pointsNumber; i++) {
      this.touchTrail[i] = {
        x: this.mouse.x,
        y: this.mouse.y,
        vx: 0,
        vy: 0,
      };
    }
  }

  private initCubeInteraction(): void {
    const cube = document.querySelector('.cube') as HTMLElement;
    if (!cube) {
      console.error('Cube element not found!');
      return;
    }
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationX = 0;
    let rotationY = 0;

    const startDrag = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      if (e instanceof MouseEvent) {
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      } else {
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
      e.preventDefault();
    };

    const stopDrag = () => {
      isDragging = false;
    };

    const onDrag = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      let clientX = 0,
        clientY = 0;
      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
      const deltaX = clientX - previousMouseX;
      const deltaY = clientY - previousMouseY;
      previousMouseX = clientX;
      previousMouseY = clientY;
      rotationY += deltaX * 0.5;
      rotationX -= deltaY * 0.5;
      cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    };

    cube.addEventListener('mousedown', startDrag);
    cube.addEventListener('mouseup', stopDrag);
    cube.addEventListener('mouseleave', stopDrag);
    cube.addEventListener('mousemove', onDrag);
    cube.addEventListener('touchstart', startDrag);
    cube.addEventListener('touchend', stopDrag);
    cube.addEventListener('touchmove', onDrag);
  }

  ngAfterViewInit() {
    this.canvas = document.querySelector('#myCanvas')! as HTMLCanvasElement;
    this.ctx = this.canvas?.getContext('2d');

    if (this.canvas && this.ctx) {
      this.setupCanvas();
      this.updateBubbles(0);
      window.addEventListener('resize', () => {
        this.setupCanvas();
      });
      window.addEventListener('click', (e: MouseEvent) => {
        this.updateMousePosition(e.pageX, e.pageY);
      });
      window.addEventListener('mousemove', (e: MouseEvent) => {
        this.mouseMoved = true;
        this.updateMousePosition(e.pageX, e.pageY);
      });
      window.addEventListener('touchmove', (e: TouchEvent) => {
        this.mouseMoved = true;
        this.updateMousePosition(
          e.targetTouches[0].pageX,
          e.targetTouches[0].pageY
        );
      });
    }

    this.initCubeInteraction();
  }

  private updateMousePosition(eX: number, eY: number): void {
    this.mouse.tX = eX;
    this.mouse.tY = eY;
  }

  private setupCanvas(): void {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }

  private updateBubbles(t: number): void {
    if (!this.mouseMoved) {
      this.mouse.tX =
        (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) *
        window.innerWidth;
      this.mouse.tY =
        (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) *
        window.innerHeight;
    }

    if (this.ctx) {
      this.ctx.strokeStyle = 'aqua';
      this.ctx.clearRect(
        0,
        0,
        this.canvas?.width || 0,
        this.canvas?.height || 0
      );
      this.ctx.beginPath();

      this.touchTrail.forEach((p, pIdx) => {
        if (pIdx === 0) {
          p.x = this.mouse.x;
          p.y = this.mouse.y;
          this.ctx?.moveTo(p.x, p.y);
        } else {
          p.vx += (this.touchTrail[pIdx - 1].x - p.x) * this.params.spring;
          p.vy += (this.touchTrail[pIdx - 1].y - p.y) * this.params.spring;
          p.vx *= this.params.friction;
          p.vy *= this.params.friction;

          p.x += p.vx;
          p.y += p.vy;
        }
      });

      for (let i = 1; i < this.touchTrail.length - 1; i++) {
        const xc = 0.5 * (this.touchTrail[i].x + this.touchTrail[i + 1].x);
        const yc = 0.5 * (this.touchTrail[i].y + this.touchTrail[i + 1].y);
        this.ctx.quadraticCurveTo(
          this.touchTrail[i].x,
          this.touchTrail[i].y,
          xc,
          yc
        );
        this.ctx.lineWidth =
          this.params.widthFactor * (this.params.pointsNumber - i);
        this.ctx.stroke();
      }

      this.ctx.lineTo(
        this.touchTrail[this.touchTrail.length - 1].x,
        this.touchTrail[this.touchTrail.length - 1].y
      );
      this.ctx.stroke();

      this.mouse.x +=
        (this.mouse.tX - this.mouse.x) * this.params.mouseThreshold;
      this.mouse.y +=
        (this.mouse.tY - this.mouse.y) * this.params.mouseThreshold;

      window.requestAnimationFrame((t) => this.updateBubbles(t));
    }
  }

  // Menu toogle -> Open/Close
  toggleNav(): void {
    this.accordion = !this.accordion;
  }

  // Menu Object
  menu: any = {
    HOME: true,
    ABOUT: false,
    SERVICES: false,
    BLOG: false,
    CONTACT: false,
  };

  menuTrigger(item: string): void {
    // Reset all menu items to false
    for (const key in this.menu) {
      if (this.menu.hasOwnProperty(key)) {
        this.menu[key] = false;
      }
    }
    // Set the clicked menu item to true
    this.menu[item] = true;
  }
}
