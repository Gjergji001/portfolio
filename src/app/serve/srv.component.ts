import { Component } from '@angular/core';

interface Skill {
  name: string;
  years: number;
  percent: number;
  animate?: boolean;
}

@Component({
  selector: 'app-srv',
  templateUrl: './srv.component.html',
  styleUrls: ['./srv.component.css'],
})
export class SrvComponent {
  skills: Skill[] = [
    { name: 'Angular', years: 3, percent: 75 },
    { name: 'CMS', years: 2, percent: 85 },
    { name: 'Marketing', years: 2, percent: 80 },
    { name: 'Design', years: 2, percent: 70 },
    { name: 'Node (Backend)', years: 1, percent: 45 },
    { name: 'React Native', years: 1, percent: 40 },
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.skills = this.skills.map((s) => ({ ...s, animate: true }));
    }, 300);
  }
}
