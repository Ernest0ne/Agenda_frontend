import { Component, Renderer2 } from '@angular/core';
import { UserService } from '../app/demo/Services/user.service';
import { MessageService } from 'primeng/components/common/api';

@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.component.html'
})

export class AppFooterComponent {


  constructor(private service: MessageService, public userService: UserService, public renderer: Renderer2) {
  }

}
