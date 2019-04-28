import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberOfSubscription: Subscription;
  customSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    const myNumbers = Observable.interval(1000);
    this.numberOfSubscription = myNumbers.subscribe(
      (number: number) => {
          console.log(number);
      }
    )
    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() =>{
        observer.next('first package');
      },2000);
      setTimeout(() =>{
        observer.next('second package');
      },4000);
      setTimeout(() =>{
        observer.complete();
      },6000);
      setTimeout(() =>{
        observer.next('third package');
      },7000);
    });
    this.customSubscription = myObservable.subscribe(
      (data:string) => {console.log(data);},
      (error:string) => {console.log(error);},
      () => {console.log("complete");},
    )
  }
  ngOnDestroy(){
    this.numberOfSubscription.unsubscribe();
    this.customSubscription.unsubscribe();
  }
}
