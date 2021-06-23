import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    route.paramMap.subscribe(map => console.log(map));
   }

  ngOnInit(): void {
  }

}
