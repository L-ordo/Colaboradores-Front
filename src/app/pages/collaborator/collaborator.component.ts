import { Component, inject } from '@angular/core';
import { CollaboratorServiceService } from '../../services/collaborator-service.service';

@Component({
  selector: 'app-collaborator',
  standalone: true,
  imports: [],
  templateUrl: './collaborator.component.html',
  styleUrl: './collaborator.component.css'
})
export default class CollaboratorComponent {

  private collaboratorsService = inject( CollaboratorServiceService );

  ngOnInit() {
    this.getCollaborators();
  }

  getCollaborators() {
    this.collaboratorsService.getCollaborators().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching collaborators:', error);
      }
    });
  }

}
