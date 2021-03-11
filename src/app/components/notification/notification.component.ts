import { Component, Input, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  private VAPID_PUBLIC_KEY = "BNHShaf20osNWbALnEEi21__iAu61yc6MAqElBHkFrPayRp3_Z-MGznI6lp6U7-Z2MNZltqghCvAi-fkP6jlGlE";

  isSubscribed: boolean = false;
  client: string = '';

  constructor(
    private swPush: SwPush,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
    
  }

  subscribeToNotifications(){
    if(!this.swPush.isEnabled){
      console.log('SW is not enabled!');
    }

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      this.isSubscribed = true;
      this.notificationService.saveSubscription(this.client, sub)
      .subscribe(res => {
        console.log(`Subscription saved for client: ${res}`);
      });
    })
    .catch(err => console.error("Could not subscribe to notifications", err));
  }

  unsubscribe(){
    this.swPush.unsubscribe();
    this.notificationService.removeSubscription(this.client)
    .subscribe( res => {
      console.log(`${this.client} unsubscribed!`);
    });
    this.isSubscribed = false;
  }

  sendNotification(){
    this.notificationService.sendNotification(this.client)
    .subscribe(res => {
      console.log(res);
    });
  }

}

