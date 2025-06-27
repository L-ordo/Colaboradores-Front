export interface Department {
    id:         number;
    nombre:     string;
    pais_id:    number;
    created_at: Date;
    updated_at: Date;
    pais:       Pais;
}

export interface Pais {
    id:         number;
    nombre:     string;
    created_at: Date;
    updated_at: Date;
}
