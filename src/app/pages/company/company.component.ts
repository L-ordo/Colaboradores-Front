import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../interfaces/company.interface';
import { DepartmentService } from '../../services/departament.service';
import { MunicipioService } from '../../services/municipio.service';
import { CountrisService } from '../../services/countris.service';

import { Muninicipios } from '../../interfaces/municipes.interface';
import { Countries } from '../../interfaces/countries.interface';
import { Department } from '../../interfaces/departamento.interface';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export default class CompanyComponent {
  private companyService = inject(CompanyService);
  private departmentService = inject(DepartmentService);
  private municipioService = inject(MunicipioService);
  private countryService = inject(CountrisService);

  nuevoEmpresa: Partial<Company> = {
    nit: '',
    razon_social: '',
    nombre_comercial: '',
    telefono: '',
    correo: '',
    pais_id: undefined ,
    departamento_id: undefined,
    municipio_id: undefined
  };

  // Datos base
  paises: Countries[] = [];
  departamentos: Department[] = [];
  municipios: Muninicipios[] = [];

  // Filtrados
  departamentosFiltrados: Department[] = [];
  municipiosFiltrados: Muninicipios[] = [];

  companies: Company[] = [];
  editMode: { [id: number]: boolean } = {};
  editedName: { [id: number]: string } = {};

  ngOnInit() {
    this.loadCompanies();
    this.countryService.getCountries().subscribe(data => this.paises = data);
    this.departmentService.getDepartments().subscribe(data => {
      console.log('Departamentos:', data);
      this.departamentos = data;
    });
    
    this.municipioService.getMunicipios().subscribe(data => {
      console.log('Municipios:', data);
      this.municipios = data;
    });
  }

  loadCompanies() {
    this.companyService.getCompanies().subscribe((res) => {
      this.companies = res;
    });
  }

  // 👇 Al cambiar país
  onPaisChange(paisId: number) {
    this.departamentosFiltrados = this.departamentos.filter(dep => dep.pais_id === paisId);
    this.municipiosFiltrados = [];
    this.nuevoEmpresa.departamento_id = undefined;
    this.nuevoEmpresa.municipio_id = undefined;
  }

  // 👇 Al cambiar departamento
  onDepartamentoChange(departamentoId: number) {
    this.municipiosFiltrados = this.municipios.filter(m => m.departamento_id === departamentoId);
    this.nuevoEmpresa.municipio_id = undefined;
  }

  enableEdit(id: number, currentName: string) {
    this.editMode[id] = true;
    this.editedName[id] = currentName;
  }

  cancelEdit(id: number) {
    this.editMode[id] = false;
  }

  saveEdit(id: number) {
    const nombre_comercial = this.editedName[id];
    this.companyService.updateCompany(id, { nombre_comercial }).subscribe(() => {
      this.editMode[id] = false;
      this.loadCompanies();
    });
  }

  eliminarEmpresa(id: number) {
    if (!confirm('¿Estás seguro de eliminar esta empresa?')) return;

    this.companyService.deleteCompany(id).subscribe({
      next: () => {
        this.companies = this.companies.filter(c => c.id !== id);
      },
      error: (err) => {
        console.error('Error al eliminar empresa:', err);
      }
    });
  }

  agregarEmpresa() {
    const e = this.nuevoEmpresa;
    if (!e.nit || !e.razon_social || !e.nombre_comercial || !e.pais_id || !e.departamento_id || !e.municipio_id) {
      alert('Completa todos los campos');
      return;
    }

    this.companyService.createCompany(e).subscribe({
      next: (res) => {
        this.loadCompanies();
        this.nuevoEmpresa = {
          nit: '',
          razon_social: '',
          nombre_comercial: '',
          telefono: '',
          correo: '',
          pais_id: undefined,
          departamento_id: undefined,
          municipio_id: undefined
        };
        this.departamentosFiltrados = [];
        this.municipiosFiltrados = [];
      },
      error: (err) => {
        console.error('Error al agregar empresa', err);
      }
    });
  }
}
