import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersActions } from '../../store/users.actions';
import { AppState } from '../../../../reducers';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { tap } from 'rxjs';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { User } from '../../services/users.service';
import { selectUsers } from '../../store/users.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],

  standalone: true,
})
export class UsersComponent {
  private liveAnnouncer = inject(LiveAnnouncer);
  private store = inject(Store<AppState>);

  dataSource = new MatTableDataSource<User>();
  users$ = this.store.select(selectUsers).pipe(
    tap((response) => {
      this.dataSource.data = response.users;
    })
  );
  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'address'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.store.dispatch(UsersActions.loadUsers());
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const filterValue = filter.trim().toLowerCase();
      return (
        data.firstName.toLowerCase().includes(filterValue) ||
        data.lastName.toLowerCase().includes(filterValue)
      );
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    // Announce the sort state change for screen readers, execute custom logic, triggering server-side sorting
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}