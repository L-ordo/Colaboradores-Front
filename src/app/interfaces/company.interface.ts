export interface Company {
    nit:              string;
    razon_social:     string;
    nombre_comercial: string;
    telefono:         string;
    correo:           string;
    pais_id:          number;
    departamento_id:  number;
    municipio_id:     number;
    created_at:       Date;
    updated_at:       Date;
    pais:             Departamento;
    departamento:     Departamento;
    municipio:        Departamento;
}

export interface Departamento {
    id:               number;
    nombre:           string;
    pais_id?:         number;
    created_at:       Date | null;
    updated_at:       Date | null;
    departamento_id?: number;
}
