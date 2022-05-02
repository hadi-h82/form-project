import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['productNme','date', 'category', 'freshness', 'comment','price','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title = 'form-project';

  constructor(private dialog: MatDialog , private api: ApiService) {}


  ngOnInit(): void {
    this.getAllProduct();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%' ,
      height: '70%'
    }).afterClosed().subscribe(val=>{
      if(val === 'seve'){
        this.getAllProduct()
      }
    }
    )
  }

  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      height: '70%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'Update'){
        this.getAllProduct()
      }
    }
    )
  }

  deleteProduct(id:number) {
    this.api.deleteProduct(id)
      .subscribe({
        next:(res)=>{
          alert('Product Deleted Successfully')
          this.getAllProduct();
        },
        error:()=>{
          alert('Error While deleting the product')
        }
      })
  }


  getAllProduct() {
    this.api.getProduct()
      .subscribe({
        next:(res:any)=>{
          // console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:()=> {
          alert("Error while fetching the Records!!!")
        }
      })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}

// npx json-server --watch db.json