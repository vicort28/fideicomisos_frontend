export interface Data {
    id: number
    attributes: Empleado
  }
  
  export interface Empleado {
    nombre: string
    correo: string
    domicilio: string
    unidad: string
    antiguedad: number
    rfc: string
    curp: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    apellido_paterno: string
    apellido_materno: string
    telefono: string
    n_empleado: string
    prestamos: Prestamo[];
    segurosVida: SeguroVida[];
    gastosFunerarios: GastosFunerarios[];
  }

  export interface ColumnaEmpleado {
    prop: string;
    name: string;
  }
  

  export interface EmpleadoDetalle {
    id: number;
    nombre: string;
    cantidad: number;
    quincenas: number;
    parentesco: string; 
    domicilio: string; 
    telefono: string; 
    fecha_fallecimiento: string; 
    beneficiario: string; 
  }


  export interface SeguroVida {
    id: number;
    fecha_fallecimiento: string; 
    domicilio: string; 
    telefono: string; 
    beneficiario: string; 
  }

  export interface Prestamo{
    id: number;
    nombre: string;
    cantidad: string;
    quincenas: number;
  }


  export interface PresatmoAprobado{
    id: number;
    cantidad: string;
    quincenas: number;
    nombre_empleado: string;
    apellido_materno_empleado: string;
    apellido_paterno_empleado: string;
  }

  export interface GastosFunerarios {
    id: number;
    parentesco: string;
  }
  