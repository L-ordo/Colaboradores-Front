import { Component, inject } from '@angular/core';
import { Department } from '../../interfaces/departamento.interface';
import { DepartmentService } from '../../services/departament.service';
import { compileNgModule } from '@angular/compiler';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Countries } from '../../interfaces/countries.interface';
import { CountrisService } from '../../services/countris.service';

@Component({
  selector: 'app-departament',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departament.component.html',
})
export default class DepartamentComponent {

  private departmentService = inject(DepartmentService);
  private countryService = inject(CountrisService);
  countries: Countries[] = [];


  departments: Department[] = [];
  editMode: { [id: number]: boolean } = {};
  editedDepartment: { [id: number]: string } = {};
  editedName: { [key: number]: string } = {};

  nuevoDepartamentoNombre: string = '';
  nuevoPaisId: number | null = null;

  ngOnInit() {
    this.loadDepartments();
    this.loadCountries();
  }
   loadCountries() {
    this.countryService.getCountries().subscribe((res) => {
      this.countries = res;
    });
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe((res) => {
      this.departments = res;
    });
  }

  enableEdit(id: number, currentName: string) {
    this.editMode[id] = true;
    this.editedDepartment[id] = currentName;
  }

  cancelEdit(id: number) {
    this.editMode[id] = false;
  }

  saveEdit(id: number) {
    const nombre = this.editedDepartment[id];
    this.departmentService.updateDepartment(id, { nombre }).subscribe(() => {
      this.editMode[id] = false;
      this.loadDepartments();
    });
  }

  eliminarDepartamento(id: number) {
    if (!confirm('¿Estás seguro de eliminar este departamento?')) return;

    this.departmentService.deleteDepartment(id).subscribe({
      next: () => {
        this.departments = this.departments.filter(d => d.id !== id);
      },
      error: (err) => {
        console.error('Error al eliminar departamento:', err);
      }
    });
  }

  agregarDepartamento() {
    const nombre = this.nuevoDepartamentoNombre.trim();
    if (!nombre || !this.nuevoPaisId) return;

    this.departmentService.createDepartment({
      nombre,
      pais_id: this.nuevoPaisId
    }).subscribe({
      next: (res) => {
        this.departments.push(res);
        this.nuevoDepartamentoNombre = '';
        this.nuevoPaisId = null;
        // Recargar departamentos para asegurarnos de que la lista esté actualizada
        this.loadDepartments();
      },
      error: (err) => {
        console.error('Error al agregar departamento', err);
      }
    });
  }

}
