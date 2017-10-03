import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    //declare variables here
    combinedTotal: number = 0;
    teams = [];
    run: Observable<any>;
    pass: Observable<any>;



    ngOnInit() {


        // initialize teams array
        this.teams.push({ running: 0, passing: 0, total: 0 });
        this.teams.push({ running: 0, passing: 0, total: 0 });


        // make observable for running variable
        this.run = new Observable(observer => {
            this.playLoop(observer);
        });

        // make observable for passing variable
        this.pass = new Observable(observer => {
            this.playLoop(observer);
        });

        // subscribe to the observers
        // first for running
        this.run.subscribe(data => {
            this.teams[data.team].running += data.yards;
            this.combinedTotal += data.yards;
            this.teams[data.team].total += data.yards;
        });
        this.pass.subscribe(data => {
            this.teams[data.team].passing += data.yards;
            this.combinedTotal += data.yards;
            this.teams[data.team].total += data.yards;
        });

    }

    playLoop(observer) {

        var randomTime = this.getRandomTime(500, 2000);
        console.log(randomTime);
        setTimeout(() => {
            observer.next({
                team: this.getRandomTime(0, 2),
                yards: this.getRandomTime(1, 50)
            });
            if (this.combinedTotal < 1000) {
                this.playLoop(observer);
            }
        }, randomTime);

    }

    getRandomTime(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
