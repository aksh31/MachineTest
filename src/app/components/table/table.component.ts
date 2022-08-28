import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Iuser } from 'src/app/shared/modal/data';




@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  userArr: any = [];
  constructor(private _http: HttpClient) { }
  displayedColumns: string[] = ['select','fullName', 'email', 'gender', 'address', 'dob'];
  dataSource = new MatTableDataSource<Iuser>();
  selection = new SelectionModel<Iuser>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this._http.get('./assets/myData.json')
      .subscribe(res => {
        // console.log(res);
        this.userArr = res;
        console.log(this.userArr.data);
        this.dataSource = new MatTableDataSource<Iuser>(this.userArr.data);
        this.dataSource.paginator = this.paginator;
      })
  }


  ngAfterViewInit() {
    // this.dataSource = new MatTableDataSource(this.userArr.data)
    // this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Iuser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.fullName + 1}`;
  }
}

