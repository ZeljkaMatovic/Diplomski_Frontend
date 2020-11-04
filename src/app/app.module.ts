import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxPopper } from 'angular-popper';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

//import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { AirlinesdisplayComponent } from './components/airlinesdisplay/airlinesdisplay.component';
import { CarsdisplayComponent } from './components/carsdisplay/carsdisplay.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { AllOffersComponent } from './components/all-offers/all-offers.component';
import { AirlineProfileComponent } from './components/airline-profile/airline-profile.component';
import { AddressComponent } from './components/address/address.component';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { FlightsComponent } from './components/flights/flights.component';
import { RentacarSearchComponent } from './components/rentacar-search/rentacar-search.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CarprofileComponent } from './components/carprofile/carprofile.component';
import { TicketLinkComponent } from './components/ticket-link/ticket-link.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { SeatsConfigComponent } from './components/seats-config/seats-config.component';
import { SeatsComponent } from './components/seats/seats.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { CarSearchComponent } from './components/car-search/car-search.component';
import { BranchComponent } from './components/branch/branch.component';
import { BranchesComponent } from './components/branches/branches.component';
import { BaggageComponent } from './components/baggage/baggage.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { LoginAlertComponent } from './components/login-alert/login-alert.component';
import { NewadminComponent } from './components/newadmin/newadmin.component';
import { NewserviceComponent } from './components/newservice/newservice.component';
import { DiscountsetterComponent } from './components/discountsetter/discountsetter.component';
import { AllfriendsComponent } from './components/allfriends/allfriends.component';
import { NewfriendComponent } from './components/newfriend/newfriend.component';
import { NewflightComponent } from './components/newflight/newflight.component';
import { AllratingsComponent } from './components/allratings/allratings.component';
import { NewbranchComponent } from './components/newbranch/newbranch.component';
import { FlightsdisplayComponent } from './components/flightsdisplay/flightsdisplay.component';
import { DiscountComponent } from './components/discount/discount.component';
import { CarpromotionsComponent } from './components/carpromotions/carpromotions.component'
import { ReserveTicketComponent } from './components/reserve-ticket/reserve-ticket.component';
import { ReserveFlightComponent } from './components/reserve-flight/reserve-flight.component'
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ModifyCarComponent } from './components/modify-car/modify-car.component';
import { ServiceCardsComponent } from './components/service-cards/service-cards.component';
import { DiscountCardsComponent } from './components/discount-cards/discount-cards.component'
import { FlightPreviewComponent } from './components/flight-preview/flight-preview.component';
import { TicketPreviewComponent } from './components/ticket-preview/ticket-preview.component';
import { DiscountModalComponent } from './components/discount-modal/discount-modal.component';
import { EditRentacarComponent } from './components/edit-rentacar/edit-rentacar.component';
import { EditBranchComponent } from './components/edit-branch/edit-branch.component';
import { QuickCarComponent } from './components/quick-car/quick-car.component';
import { CarSpecialOfferComponent } from './components/car-special-offer/car-special-offer.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component'
import { RevenueGraphComponent } from './components/revenue-graph/revenue-graph.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { EditAirlineComponent } from './components/edit-airline/edit-airline.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { HistoryComponent } from './components/history/history.component';
import { RateRentacarComponent } from './components/rate-rentacar/rate-rentacar.component';
import { RateAirlineComponent } from './components/rate-airline/rate-airline.component';
import { ToastrModule } from 'ngx-toastr';
import { ReserveCarComponent } from './components/reserve-car/reserve-car.component';
import { RentacarGraphComponent } from './components/rentacar-graph/rentacar-graph.component'; 
import { CookieService } from "ngx-cookie-service";
import { AuthInterceptor } from './auth/auth.interceptor';
import { RentacarRatingsComponent } from './components/rentacar-ratings/rentacar-ratings.component';
import { AllInvitationsComponent } from './components/all-invitations/all-invitations.component';
import { ChatComponent } from './components/chat/chat.component';

export function socialConfigs() {  
  console.log("usao");
  const config = new AuthServiceConfig(  
    [   
      {  
        id: GoogleLoginProvider.PROVIDER_ID,  
        provider: new GoogleLoginProvider('1067186842492-rr4opla2gfgpveaprp7dn9l3tk2s7iij.apps.googleusercontent.com')  
      }  
    ]  
  );  
  return config;  
}  
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ToolbarComponent,
    HomeComponent,
    AirlinesdisplayComponent,
    CarsdisplayComponent,
    AllOffersComponent,
    UserAccountComponent,
    AirlineProfileComponent,
    AddressComponent,
    DestinationsComponent,
    FlightsComponent,
    RentacarSearchComponent,
    CalendarComponent,
    CarprofileComponent,
    TicketLinkComponent,
    TicketsComponent,
    SeatsConfigComponent,
    SeatsComponent,
    VehiclesComponent,
    CarSearchComponent,
    BranchComponent,
    BranchesComponent,
    BaggageComponent,
    PromotionsComponent,
    LoginAlertComponent,
    NewadminComponent,
    NewserviceComponent,
    DiscountsetterComponent,
    AllfriendsComponent,
    NewfriendComponent,
    NewflightComponent,
    AllratingsComponent,
    NewbranchComponent,
    FlightsdisplayComponent,
    ReserveTicketComponent,
    ReservationListComponent,
    DiscountComponent,
    ReserveFlightComponent,
    CarpromotionsComponent,
    ModifyCarComponent,
    FlightPreviewComponent,
    TicketPreviewComponent,
    ServiceCardsComponent,
    DiscountCardsComponent,
    DiscountModalComponent,
    EditRentacarComponent,
    EditBranchComponent,
    QuickCarComponent,
    CarSpecialOfferComponent,
    SpecialOffersComponent,
    RevenueGraphComponent,
    GraphsComponent,
    EditAirlineComponent,
    CarListComponent,
    HistoryComponent,
    RateRentacarComponent,
    RateAirlineComponent,
    ReserveCarComponent,
    RentacarGraphComponent,
    RentacarRatingsComponent,
    AllInvitationsComponent,
    ChatComponent,
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPopper,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyC-0U41YhzWY_E1aRF32phjxhOVHUZiNwU'}),
    ToastrModule.forRoot(),
    
    //MatIconModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {  
      provide: AuthServiceConfig,  
      useFactory: socialConfigs  
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
