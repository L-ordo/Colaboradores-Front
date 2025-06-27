export interface Muninicipios {
    id:              number;
    nombre:          string;
    departamento_id: number;
    created_at:      Date;
    updated_at:      Date;
    departamento:    Departamento;
}

export interface Departamento {
    id:         number;
    nombre:     string;
    pais_id:    number;
    created_at: Date;
    updated_at: Date;
}
