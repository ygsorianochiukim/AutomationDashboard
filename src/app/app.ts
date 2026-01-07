import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  showAlert(){
    Swal.fire({
      position: 'top-end',
      text: 'Operation completed successfully.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      background: '#009183',
      color: 'white'
    });
  }
}
