import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //declare the variables
  combinedTotal: number = 0;
  teams = [];
  private pass: Observable<any>;
  private run: Observable<any>;


  ngOnInit(): void {
    this.teams.push({ passing: 0, running: 0, total: 0 });
    this.teams.push({ passing: 0, running: 0, total: 0 });

    this.pass = new Observable(observer => {
      this.playLoop(observer);
    });

    this.pass.subscribe(data => {
      this.teams[data.team].passing += data.yards;
      this.addTotal(data.team, data.yards);
      this.combinedTotal += data.yards;
    });

    this.run = new Observable(observer => {
      this.playLoop(observer);
    });
    this.run.subscribe(data => {
      this.teams[data.team].running += data.yards;
      this.addTotal(data.team, data.yards);
      this.combinedTotal += data.yards;
    });
  }

  addTotal(team, yards) {
    this.teams[team].total += yards;
  }

  playLoop(observer) {
    var time = this.getRandom(500, 2000);
    setTimeout(() => {
      observer.next({
        team: this.getRandom(0, 2),
        yards: this.getRandom(0, 30)
      });
      console.log(this.getRandom(0,2));
      if (this.combinedTotal < 1000) {
        this.playLoop(observer);
      }
    }, time);
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}