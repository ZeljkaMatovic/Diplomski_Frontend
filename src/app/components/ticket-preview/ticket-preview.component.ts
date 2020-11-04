import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/entities/ticket/ticket';
import { ActivatedRoute } from '@angular/router';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { User } from 'src/app/entities/users/users';

@Component({
  selector: 'app-ticket-preview',
  templateUrl: './ticket-preview.component.html',
  styleUrls: ['./ticket-preview.component.css']
})
export class TicketPreviewComponent implements OnInit {

  id: number;
  ticket: Ticket;
  user: User;

  constructor(private route: ActivatedRoute, public service: AirlineService) {
    route.params.subscribe(params => {this.id = params['id']; });
    this.user = JSON.parse(localStorage.getItem("user"));
   }

  ngOnInit(): void {
    this.service.findTicket(Number(this.id)).subscribe(
      (res: any) => {
        this.ticket = res as Ticket;
      }
    );

    localStorage.setItem("ticket", JSON.stringify(this.ticket));
    
    console.log(this.ticket.seat);
  }

}
