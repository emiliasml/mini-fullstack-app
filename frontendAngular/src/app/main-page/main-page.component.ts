import { Component, OnInit } from '@angular/core';
import { IUser } from '../data/_models/user.interface';
import { UserDataService } from '../data/_services/user.data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../components/user-dialog/user-dialog.component';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'actions'];
  dataSource: MatTableDataSource<IUser> = new MatTableDataSource();

  constructor(
    private userDataService: UserDataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userDataService.getData();
    this.userDataService.dataChange$.subscribe((data: IUser[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.setFilterByName();
    });
  }

  /* we want the table to be filtered just by the lastName and firstName columns,
   so I changed the default filter using filterPredicate */
  setFilterByName(): void {
    this.dataSource.filterPredicate = (data: any, filtersJson: string) => {
      const matchFilter: any = [];
      const filters = JSON.parse(filtersJson);
      filters.forEach((filter: any) => {
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(
          val.toLowerCase().includes(filter.value.toLowerCase())
        );
      });
      return matchFilter.find((el: any) => el);
    };
  }

  applyFilter(myEvent: Event) {
    const filterValue = (myEvent.target as HTMLInputElement).value;
    const tableFilters = [];
    tableFilters.push(
      {
        id: 'lastName',
        value: filterValue,
      },
      {
        id: 'firstName',
        value: filterValue,
      }
    );
    this.dataSource.filter = JSON.stringify(tableFilters);
  }

  createUser() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: {
        editMode: false,
      },
    });
    dialogRef.afterClosed().subscribe((newUser) => {
      if (newUser) {
        /* add the new user to the dataSource */
        this.dataSource.data.push(newUser);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.setFilterByName();
      }
    });
  }

  editUser(editUser: any) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: {
        editMode: true,
        user: editUser,
      },
    });
    dialogRef.afterClosed().subscribe((updatedUser) => {
      if (updatedUser) {
        /* update the dataSource from the table with the new user */
        this.dataSource.data.splice(
          this.dataSource.data.indexOf(editUser),
          1,
          updatedUser
        );
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.setFilterByName();
      }
    });
  }

  openConfirmationDialog(user: IUser) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.deleteUser(user);
      }
    });
  }

  deleteUser(user: IUser) {
    this.userDataService.deleteItem(user.id).subscribe((response: any) => {
      alert(response.message);
      /* delete the deleted user from the dataSource */
      this.dataSource.data.splice(this.dataSource.data.indexOf(user), 1);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      this.setFilterByName();
    });
  }
}
