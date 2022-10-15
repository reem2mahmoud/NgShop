import { Component, OnInit } from '@angular/core';
import { UsersServices , User} from '@e-commerce/users';
import { ConfirmationService  , MessageService} from 'primeng/api';


@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  constructor(private _usersServices: UsersServices,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService) { }

    users: User[] = []

  ngOnInit(): void {
    this.showUsersList()
  }

  showUsersList() {
    this._usersServices.getUsersList().subscribe(response => {
      this.users = response.data
      console.log(response)
    })
  }
}
