import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/shared/models/Product';
import { Tags } from 'src/app/shared/models/Tags';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-new-product-dialog',
  templateUrl: './new-product-dialog.component.html',
  styleUrls: ['./new-product-dialog.component.scss'],
})
export class NewProductDialogComponent implements OnInit {
  edit: string = 'default';
  tags: Tags[] = [];
  product: Product | null = null;

  productForm: FormGroup = this.fb.group({
    productId: [''],
    productName: ['', Validators.required],
    price: [null, Validators.required],
    tags: [[]],
    description: [''],
    imageUrl: ['products_image/zflip5.jpg', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA)
    public dialogdata: {
      initialedit: string;
      tags: Tags[];
      product: Product;
    },
    public dialog: MatDialog
  ) {
    this.edit = dialogdata.initialedit;
    this.tags = dialogdata.tags;
    this.product = dialogdata.product ? dialogdata.product : null;
    if (dialogdata.product) {
      this.productForm.controls['productName'].setValue(
        dialogdata.product.productName
      );

      this.productForm.controls['productId'].setValue(
        dialogdata.product.productId
      );
      this.productForm.controls['price'].setValue(dialogdata.product.price);

      this.productForm.controls['tags'].setValue(dialogdata.product.tags);

      this.productForm.controls['description'].setValue(
        dialogdata.product.description
      );
      this.productForm.controls['imageUrl'].setValue(
        dialogdata.product.imageUrl
      );
    }
  }

  ngOnInit(): void {}

  onSubmit() {
    const formData = this.productForm.value as Product;
    if (!formData.productName || !formData.price || this.product == null) {
    } else if (this.product != null) {
      this.productService.updateProduct(this.product);
    } else {
      this.productService.createProduct(formData);
    }
  }
}
