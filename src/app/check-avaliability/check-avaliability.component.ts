import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-check-avaliability',
  templateUrl: './check-avaliability.component.html',
  styleUrls: ['./check-avaliability.component.css']
})
export class CheckAvaliabilityComponent implements OnInit {

  private selectedLink: string="oneWay";        
  setradio(e: string): void   
  {  
    this.selectedLink = e;           
  }  
    isSelected(name: string): boolean   
  {  
        if (!this.selectedLink) {   
            return false;  
  }  
        return (this.selectedLink === name);   
  }  
  
  avails: any[] = [];
  check: any = null;
  
  constructor(private userService: UserServiceService) { }

  ngOnInit() {
  }
  checkAvail(checkAvailForm) {
    this.userService.chechAvail(checkAvailForm.value).subscribe(data => {

      if (data.availList != null) {
        this.avails = data.availList;
        alert('Availability Check Successfully');
        this.check = true;
        this.userService.avail = true;
        checkAvailForm.reset();
      } else {
        console.log(data);
        alert('No Availability on that day');
        checkAvailForm.reset();
        this.check = false;
      }
    });
  }
}
