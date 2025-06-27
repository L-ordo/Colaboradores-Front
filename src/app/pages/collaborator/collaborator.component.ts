import { Component, inject } from '@angular/core';
import { CollaboratorServiceService } from '../../services/collaborator-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collaborator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './collaborator.component.html',
  styleUrl: './collaborator.component.css'
})
export default class CollaboratorComponent {

  private collaboratorsService = inject( CollaboratorServiceService );

  colaboradores: any[] = [];

  // Estado del formulario de edición
  editandoColaborador: boolean = false;
  colaboradorEditando: any = null;

  // Campos del formulario de edición
  nombreEditado: string = '';
  edadEditada: number = 0;
  telefonoEditado: string = '';
  correoEditado: string = '';


  ngOnInit() {
    this.getCollaborators();
  }

  getCollaborators() {
    this.collaboratorsService.getCollaborator().subscribe((res) => {
      console.log('Data successfully:', res);
      this.colaboradores = res; //  Reemplaza los datos anteriores
    });
  }
  
 // Mostramos el formulario con los datos del colaborador seleccionado
  activarFormularioEdicion(colaborador: any) {
    this.editandoColaborador = true;
    //Guardamos el colaborador que se está editando
    this.colaboradorEditando = colaborador;

    //lenamos los campos del formulario con los datos del colaborador seleccionado
    this.nombreEditado = colaborador.nombre_completo;
    this.edadEditada = colaborador.edad;
    this.telefonoEditado = colaborador.telefono;
    this.correoEditado = colaborador.correo;
  }

  cancelarEdicion() {
    this.editandoColaborador = false;
    this.colaboradorEditando = null;
  }


  //actuliza los datos del colaborador seleccionado
  guardarEdicion() {
    if (!this.colaboradorEditando) return;

    const dataActualizada = {
      ...this.colaboradorEditando,
      nombre_completo: this.nombreEditado,
      edad: this.edadEditada,
      telefono: this.telefonoEditado,
      correo: this.correoEditado
    };

    this.collaboratorsService.updateCollaborator(this.colaboradorEditando.id, dataActualizada).subscribe({
      next: () => {
        this.getCollaborators();
        this.cancelarEdicion();
      },
      error: (err) => {
        console.error('Error al actualizar colaborador', err);
      }
    });
  }

  //delete a collaborator
  eliminarColaborador(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este colaborador?')) {
      this.collaboratorsService.deleteCollaborator(id).subscribe({
        next: () => {
          this.colaboradores = this.colaboradores.filter(c => c.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar colaborador:', err);
        }
      });
    }
  }
  

}
