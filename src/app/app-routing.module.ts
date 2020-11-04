import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

import { CarprofileComponent } from './components/carprofile/carprofile.component'
import { SigninGuard } from './guards/signin/signin.guard'
import { AirlinesdisplayComponent } from './components/airlinesdisplay/airlinesdisplay.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { AllOffersComponent } from './components/all-offers/all-offers.component';
import { AirlineProfileComponent } from './components/airline-profile/airline-profile.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { SeatsComponent } from './components/seats/seats.component';
import { BranchComponent } from './components/branch/branch.component'
import { PromotionsComponent } from './components/promotions/promotions.component';
import {NewadminComponent} from './components/newadmin/newadmin.component'
import { NewserviceComponent } from './components/newservice/newservice.component';
import { NewbranchComponent } from './components/newbranch/newbranch.component';
import {LoggedInGuard} from './guards/logged-in/logged-in.guard'
import { IssysadminGuard } from './guards/issysadmin/issysadmin.guard';
import { CarsdisplayComponent } from './components/carsdisplay/carsdisplay.component';
import { DiscountsetterComponent } from './components/discountsetter/discountsetter.component';
import { AllfriendsComponent } from './components/allfriends/allfriends.component';
import { NewfriendComponent } from './components/newfriend/newfriend.component';
import { IsrcsaadminGuard } from './guards/isrcsadmin/isrcsaadmin.guard';
import { NewflightComponent } from './components/newflight/newflight.component';
import { AllratingsComponent } from './components/allratings/allratings.component';
import { FlightsdisplayComponent } from './components/flightsdisplay/flightsdisplay.component';
import { ReserveTicketComponent } from './components/reserve-ticket/reserve-ticket.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { DiscountComponent } from './components/discount/discount.component';
import { ReserveFlightComponent } from './components/reserve-flight/reserve-flight.component';
import { FlightsComponent } from './components/flights/flights.component';
import { FlightPreviewComponent } from './components/flight-preview/flight-preview.component';
import { TicketPreviewComponent } from './components/ticket-preview/ticket-preview.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { RevenueGraphComponent } from './components/revenue-graph/revenue-graph.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { IsruGuard } from './guards/isru/isru.guard';
import { HistoryComponent } from './components/history/history.component';
import { RentacarGraphComponent } from './components/rentacar-graph/rentacar-graph.component';
import { RentacarRatingsComponent } from './components/rentacar-ratings/rentacar-ratings.component';
import { AllInvitationsComponent } from './components/all-invitations/all-invitations.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "home/:username",
    children: [
      { path: "", component: HomeComponent },
      { path: "useraccount", component: UserAccountComponent}
    ]
  },
  {
    path: "registration",
    component: RegistrationComponent,
    canActivate: [SigninGuard]
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [SigninGuard]  
  },
  {
    path: "airlines",
    component: AirlinesdisplayComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: "rentacars",
    component: CarsdisplayComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: "alloffers",
    children: [
      { path: "", component: AllOffersComponent},
      { path: ":id/airlineprofile",
        children: [
          { path: "", component: AirlineProfileComponent },
          { path: "tickets", component: TicketsComponent },
          { path: "seats", component: SeatsComponent },
          { path: ":put", component: AirlineProfileComponent},
        ] 
      },
      {
        path: ":id/carprofile",
        //canActivate: [IsruGuard],
        children: [
          { path: "", component: CarprofileComponent},
          { path: ":put", component: CarprofileComponent},
          { path: "branch/:bid", component: BranchComponent},
        ]
      }
    ]
  },
  {
    path: "service",
    children: [
      {path: ":id/adminview",
      canActivate: [IsrcsaadminGuard],   
      children: [
        { path: "", component: CarprofileComponent},
        { path: ":put", component: CarprofileComponent},
        { path: "branch/:bid", component: BranchComponent},
      ]}
    ]
    
  },
  {
    path: "useraccount",
    component: UserAccountComponent
  },
  {
    path: "promotions",
    component: PromotionsComponent
    
  },
  {
    path: "newadmin/:id",
    component: NewadminComponent,
    canActivate: [IssysadminGuard]
  },
  {
    path: "newservice/:id",
    component: NewserviceComponent,
    canActivate: [IssysadminGuard]
  },
  {
    path: "discounts",
    canActivate: [IssysadminGuard],
    //canActivateChild: [IssysadminGuard],
    children: 
    [
      {
        path: "",
        component: DiscountComponent
      },
      {
        path: ":put/:id",
        component: DiscountsetterComponent
      }
    ]
  },
  {
    path: "newbranch",
    component: NewbranchComponent,
    canActivate: [IsrcsaadminGuard]    
  },
  {
    path: "allfriends",
    component: AllfriendsComponent
  },
  {
    path: "newfriend",
    component: NewfriendComponent
  },
  {
    path: "newflight",
    component: NewflightComponent
  },
  {
    path: "allratings",
    component: AllratingsComponent
  },
  {
    path: "flightsdisplay",
    component: FlightsdisplayComponent
  },
  {
    path: ":id/reserveticket",
    component: ReserveTicketComponent
  },
  {
    path: "reserveflight",
    children: [
      { path: "", component: ReserveFlightComponent },
      { path: ":id", 
        children: [
          { path: "", component: ReserveFlightComponent },
          { path: ":id2", component: ReserveFlightComponent },
        ]
      }
    ]
  },
  {
    path: "reservationlist",
    component: ReservationListComponent
  },
  {
    path: "flightsearch",
    component: FlightsComponent
  },
  {
    path: "flightpreview/:id",
    component: FlightPreviewComponent
  },
  {
    path: "ticketpreview/:id",
    component: TicketPreviewComponent
  },
  {
    path: ":id/chooseseat/:idSeat",
    component: SeatsComponent
  },
  {
    path: "salesgraph", 
    component: GraphsComponent,
  },
  {
    path: "revenuegraph", 
    component: RevenueGraphComponent,
  },
  {
    path: "car-list",
    component: CarListComponent,
    canActivate: [IsruGuard]
  },
  {
    path: "reservation-history",
    component: HistoryComponent,
    canActivate: [IsruGuard]
  },
  {
    path: "graph",
    component: RentacarGraphComponent,
    canActivate: [IsrcsaadminGuard]
  },
  {
    path: "rentacar-rating",
    component: RentacarRatingsComponent,
    canActivate: [IsrcsaadminGuard]
  },
  {
    path: "invitations",
    component: AllInvitationsComponent
  },
  {
    path: "chat/:id",
    component: ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
