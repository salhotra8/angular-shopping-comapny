import { AuthenticationService } from './../services/authentication.service';
import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { NGB_DATEPICKER_CALENDAR_FACTORY } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { take } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  myOrders: any = [];
  user: any;

  constructor(private orderService: OrderService,
    private auth: AuthenticationService) {

    this.user = this.auth.user;
  }

  ngOnInit() {


    this.orderService.getOrders().pipe(take(1)).subscribe((data) => {
      let orderData = data
      for (let data of orderData) {
        if (this.user.uid == data.user) {
          this.myOrders.push(data);

        }
      }
    })
  }

}
