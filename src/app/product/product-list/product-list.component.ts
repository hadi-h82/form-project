import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { RegisterProductComponent } from '../register-product/register-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = [
    'productNme',
    'date',
    'category',
    'freshness',
    'comment',
    'price',
    'Action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private tostr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  openDialog() {
    this.dialog
      .open(RegisterProductComponent, {
        width: '30%',
        height: '70%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'seve') {
          this.getAllProduct();
        }
      });
  }

  editProduct(row: any) {
    this.dialog
      .open(RegisterProductComponent, {
        width: '30%',
        height: '70%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        this.getAllProduct();
      });
  }

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: (res) => {
        this.tostr.success('Product Deleted Successfully');
        this.getAllProduct();
      },
    });
  }

  getAllProduct() {
    this.api.getProduct().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
