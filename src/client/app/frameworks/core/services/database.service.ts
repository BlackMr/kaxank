import {Injectable, Inject, NgZone} from '@angular/core';
import {FIREBASE} from '../../core/index';

@Injectable()
export class DatabaseService {
  private database:any;
  private onSync:Function;
  private userID:string;
  constructor(@Inject(FIREBASE) firebase:any, private ngZone: NgZone) {
    console.log('Constructing DatabaseService');
    // Initialize Firebase
    var config = {
      // your web config from Firebase console
    };
    firebase.initializeApp(config);
    this.database = firebase.database();
  }

  sync(path: string, onValueReceived: Function):void {
    this.database.ref(path).on('value', (snapshot:any) => {
      this.ngZone.run(() => {
        onValueReceived(snapshot.val());
      });
    });
  }

  addChild(path: string, data:any, callback?:Function):void {
    this.database.ref(path).push(data, (err:any) => {
      if (callback && !err) {
        this.ngZone.run(() => {
          callback();
        });
      }
    });
  }
}




/*
import {Injectable, Inject} from '@angular/core';
import {FIREBASE} from '../../core/index';

@Injectable()
export class DatabaseService {
  private database:any;
  private onSync:Function;
  //private userID:string;
  constructor(@Inject(FIREBASE) firebase:any) {
    console.log('Constructing DatabaseService');
    // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyBMp1dQPwzPvRvkIlUmIaeqTVAdunrtHhs',
    authDomain: 'kaxank-58053.firebaseapp.com',
    databaseURL: 'https://kaxank-58053.firebaseio.com',
    storageBucket: '',
  };
    firebase.initializeApp(config);
    this.database = firebase.database();
  }

  sync(path: string, onValueReceived: Function):void {
    this.onSync = (snapshot:any) => onValueReceived(snapshot.val());
    this.database.ref(path).on('value', this.onSync);
  }

  addChild(path: string, data:any, callback?:Function):void {
    this.database.ref(path).push(data, (err:any) => {
      if (callback && !err) {
        callback();
      }
    });
  }
}
*/
