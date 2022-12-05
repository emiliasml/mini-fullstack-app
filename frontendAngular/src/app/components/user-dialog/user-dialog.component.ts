import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser, IUserCreate } from 'src/app/data/_models/user.interface';
import { UserDataService } from 'src/app/data/_services/user.data.service';
import {
  CreateResponse,
  Response,
} from 'src/app/data/_models/response.interface';

export interface DialogData {
  editMode: boolean;
  user: IUser;
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  editMode: boolean = false;
  user!: IUser;
  userForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UserDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.editMode = this.data.editMode;
    if (this.data.user) {
      this.user = this.data.user;
    }
    this.userForm = this.formBuilder.group({
      firstName: [this.user ? this.user.firstName : null, Validators.required],
      lastName: [this.user ? this.user.lastName : null, Validators.required],
      age: [this.user ? this.user.age : null, Validators.required],
    });
  }

  onSubmit() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return;
    }

    if (this.editMode) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  updateUser() {
    let formValues = this.userForm.getRawValue();

    let newUser: IUser = {
      id: this.user.id,
      lastName: formValues.lastName,
      firstName: formValues.firstName,
      age: parseInt(formValues.age),
    };
    this.userDataService.updateItem(newUser).subscribe((data: Response) => {
      alert(data.message);
      this.dialogRef.close(newUser);
    });
  }

  createUser() {
    let formValues = this.userForm.getRawValue();
    let newUser: IUserCreate = {
      lastName: formValues.lastName,
      firstName: formValues.firstName,
      age: parseInt(formValues.age),
    };
    this.userDataService.addItem(newUser).subscribe((data: CreateResponse) => {
      alert(data.message);
      this.dialogRef.close({
        lastName: newUser.lastName,
        firstName: newUser.firstName,
        age: newUser.age,
        id: data.insertId,
      });
    });
  }
}
