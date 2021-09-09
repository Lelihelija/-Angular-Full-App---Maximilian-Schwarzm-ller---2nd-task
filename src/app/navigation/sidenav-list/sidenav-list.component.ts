import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>()
  authSubscription: Subscription
  authStatus = false

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus: boolean) => (this.authStatus = authStatus),
    )
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe()
  }

  onClose() {
    this.closeSidenav.emit()
  }

  logout(): void {
    this.authService.logout()
  }
}
