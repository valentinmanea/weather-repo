import { SubscribeService } from './../../services/subscribe.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/model/subscription';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  subscriptions:Subscription[];
  
  constructor(private subscriberService:SubscribeService) { }

  ngOnInit() {
    this.subscriberService.getAllSubscriptionsForCurrentUser().subscribe(response => {
      console.log(response);
      this.subscriptions = response;
      this.subscriptions.forEach(s=>console.log(s.active))
      this.subscriptions.forEach(s=>s.statusImgSrc = s.active? 'https://cdn1.iconfinder.com/data/icons/silk2/tick.png':'https://icon-library.net/images/inactive-icon/inactive-icon-8.jpg')
    });
    
  }
  changeStatus(index){
    console.log(this.subscriptions[index])
    this.subscriberService.changeStatus(this.subscriptions[index]).subscribe(response=> {
      console.log('response', response)
      this.subscriptions[index].active = response
      this.subscriptions[index].statusImgSrc = this.subscriptions[index].active ? 'https://cdn1.iconfinder.com/data/icons/silk2/tick.png': 'https://icon-library.net/images/inactive-icon/inactive-icon-8.jpg' ;
    });
  }
}
