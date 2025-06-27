import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountrisService } from '../../services/countris.service';
import { Countries } from '../../interfaces/countries.interface';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export default class CountryComponent {
  private countryService = inject(CountrisService);

  countries: Countries[] = [];
  editMode: { [id: number]: boolean } = {};
  editedCountry: { [id: number]: string } = {};
  editedName: { [key: number]: string } = {};

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.countryService.getCountries().subscribe((res) => {
      this.countries = res;
    });
  }

  enableEdit(id: number, currentName: string) {
    this.editMode[id] = true;
    this.editedCountry[id] = currentName;
  }

  cancelEdit(id: number) {
    this.editMode[id] = false;
  }

  saveEdit(id: number) {
    const nombre = this.editedCountry[id];
    this.countryService.updateCountry(id, { nombre }).subscribe(() => {
      this.editMode[id] = false;
      this.loadCountries();
    });
  }


  eliminarPais(id: number) {
    if (!confirm('¿Estás seguro de eliminar este país?')) return;
  
    this.countryService.deleteCountry(id).subscribe({
      next: () => {
        // Filtra el país eliminado de la lista local
        this.countries = this.countries.filter(c => c.id !== id);
      },
      error: (err) => {
        console.error('Error al eliminar país:', err);
      }
    });
  }

  nuevoPaisNombre: string = '';

agregarPais() {
  const nombre = this.nuevoPaisNombre.trim();
  if (!nombre) return;

  this.countryService.createCountry({ nombre }).subscribe({
    next: (res) => {
      this.countries.push(res); // actualiza la lista
      this.nuevoPaisNombre = ''; // limpia el input
    },
    error: (err) => {
      console.error('Error al agregar país', err);
    }
  });
}

  

}
