import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../../core/models/user.interface';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activated-plan',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    GooglePayButtonModule,
  ],
  templateUrl: './activated-plan.component.html',
  styleUrl: './activated-plan.component.css'
})

export class ActivatedPlanComponent {
  private activatedRoute = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private router = inject(Router);
  user$!: Observable<User>;
  userId!: string;
  dateOfPurchase!: Date;
  endDate!: Date;
  formattedDate!: string;
  formattedEndDate!: string;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.userId! = this.activatedRoute.snapshot.params['id'];
    this.user$ = this.userService.getUser(id);

    this.user$.subscribe(user => {
      if (user) {
        this.dateOfPurchase = new Date(user.dateOfPurchase);
        this.endDate = calculateEndDate(this.dateOfPurchase);
        this.formattedDate = new Date(this.dateOfPurchase).toLocaleDateString('es-MX', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        this.formattedEndDate = new Date(this.endDate).toLocaleDateString('es-MX', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      }
    });

    function calculateEndDate(dateOfPurchase: Date): Date {
      const currentMonth = dateOfPurchase.getMonth();
      const currentYear = dateOfPurchase.getFullYear();

      let nextMonth = currentMonth + 1;
      let nextYear = currentYear;

      if (nextMonth === 12) {
        nextMonth = 0;
        nextYear++;
      }

      const endDate = new Date(nextYear, nextMonth, 1);

      endDate.setDate(endDate.getDate() + (endDate.getMonth() === nextMonth ? Math.max(dateOfPurchase.getDate(), endDate.getDate()) : 0));

      return endDate;
    }
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

    const fechaISO = new Date();
    const fechaISOString = fechaISO.toISOString();
    const partesFecha = fechaISOString.split('T');
    const fechaModificada = partesFecha[0] + ' ' + partesFecha[1].replace('Z', '');

    this.userService.updateUserPlan(this.userId, true, fechaModificada)
      .then(() => {
        console.log('User plan updated successfully');
        this.router.navigate(['/user/payment-details/plan/' + this.userId]);
      })
      .catch(error => {
        console.error('Error updating user plan:', error);
      });
  }

  cancelPlan() {
    this.userService.updateUserPlan(this.userId, false, '')
      .then(() => {
        console.log('User plan cancelled successfully');
        this.router.navigate(['/user/payment-details/free/' + this.userId]);
      })
      .catch(error => {
        console.error('Error cancelling user plan:', error);
      });
  }
}
