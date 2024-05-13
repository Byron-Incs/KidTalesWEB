import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../../core/models/user.interface';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    GooglePayButtonModule,
  ],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent {
  private activatedRoute = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private router = inject(Router);
  user$!: Observable<User>;
  userId!: string;

  ngOnInit(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.userId! = this.activatedRoute.snapshot.params['id'];
    this.user$ = this.userService.getUser(id);
  }

  buttonWidth = 240;

  paymentRequest: google.payments.api.PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"]
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '100.00',
      currencyCode: 'USD',
      countryCode: 'US'
    }
  }

  onLoadPaymentData(event: any) {
    console.log(event, ">> Data");

    console.log('Payment successful:', event.detail);
    const paymentDetails = event.detail.paymentData;

    this.userService.updateUserPlan(this.userId, true)
      .then(() => {
        console.log('User plan updated successfully');
        this.router.navigate(['/user/payment-details/plan/' + this.userId]);
      })
      .catch(error => {
        console.error('Error updating user plan:', error);
      });
  }
}

