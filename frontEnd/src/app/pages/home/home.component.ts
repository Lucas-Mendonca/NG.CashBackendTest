import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public list:number[] = []

  ngOnInit(): void {
    for(let i = 0; i < 101; i++) {
      this.list.push(i)
    }
  }

}
