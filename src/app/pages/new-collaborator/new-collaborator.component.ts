import { Component, inject } from '@angular/core';
import { CollaboratorServiceService } from '../../services/collaborator-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-new-collaborator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-collaborator.component.html',
  styleUrl: './new-collaborator.component.css'
})


export default class NewCollaboratorComponent {

  private collaboratorsService = inject(CollaboratorServiceService);
  private companyService = inject(CompanyService); 


  exitoCreacion: boolean = false;
  empresas: any[] = []; // Aquí cargarás las empresas


  // Datos del formulario
  nombre_completo: string = '';
  edad: number | null = null;
  telefono: string = '';
  correo: string = '';
  empresa_ids: number[] = [];


  ngOnInit() {
    this.getEmpresas();
  }

  getEmpresas() {
    this.companyService.getCompanies().subscribe((res)=>{
      console.log('Empresas obtenidas:', res);
      this.empresas = res; // Asignamos las empresas obtenidas al array
    })
  }

 toggleEmpresa(id: number, checked: boolean) {
    if (checked) {
      this.empresa_ids.push(id);
    } else {
      this.empresa_ids = this.empresa_ids.filter(empId => empId !== id);
    }
  }

  guardarColaborador() {
    const nuevoColaborador = {
      nombre_completo: this.nombre_completo,
      edad: this.edad,
      telefono: this.telefono,
      correo: this.correo,
      empresa_ids: this.empresa_ids
    };
  
    this.collaboratorsService.createCollaborator(nuevoColaborador).subscribe({
      next: (res) => {
        console.log('Colaborador creado:', res);
        this.exitoCreacion = true;
  
        // limpiamos el formulario
        this.nombre_completo = '';
        this.edad = 18;
        this.telefono = '';
        this.correo = '';
        this.empresa_ids = [];
      },
      error: (err) => {
        console.error('Error al crear colaborador', err);
        this.exitoCreacion = false;
      }
    });
  }
  
}

