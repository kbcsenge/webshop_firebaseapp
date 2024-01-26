import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { Customer } from 'src/app/shared/models/Customer';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.customerService
      .getAllCustomers()
      .subscribe((customers) => (this.customers = customers));
  }

  onDelete(customerId: string) {
    this.customerService.deleteCustomerById(customerId);
  }

  openDialog(customer: Customer) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: customer,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDelete(customer.customerId);
      }
    });
  }
}

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm_dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Customer) {}
}
