
CREATE TABLE public.roles (
	id serial NOT NULL,
	nombre varchar NOT NULL,	
	CONSTRAINT roles_pk PRIMARY KEY (id)
);

CREATE TABLE public.usuarios (
	id varchar(20) NOT NULL,
	tipo_identificacion varchar(40) NULL,
	nombre varchar(100) NOT NULL,
	apellido varchar(100) NULL,
	correo varchar NOT NULL,
	celular varchar(10) NULL,
	clave varchar(50) NOT NULL,
	rol integer NOT NULL,
	CONSTRAINT usuarios_pk PRIMARY KEY (id)
);

CREATE TABLE public.motos (
	placa varchar(20) NOT NULL, 
	id_propietario varchar(20) NOT NULL,
	modelo varchar NULL,
	marca varchar NULL,
	color varchar  NULL,
	cilindraje varchar  NULL,
	nro_tecnomecanica varchar  NULL,
	vencimiento_tecnomecanica date  NULL,
	nro_soat varchar  NULL,
	vencimiento_soat date  NULL,
	nro_matricula varchar  NULL,
	estado varchar  NULL,
	CONSTRAINT motos_pk PRIMARY KEY (placa)
);

CREATE TABLE public.seguimientos (
    id serial NOT NULL,
	id_mecanico varchar(20) NOT NULL, 
	placa varchar(20) NOT NULL,
    fecha datetime  NOT NULL,
	mano_obra text NOT NULL,
	repuestos text NOT NULL,	
	horas integer  NOT NULL,
	CONSTRAINT seguimientos_pk PRIMARY KEY (id)
);



ALTER TABLE public.usuarios ADD CONSTRAINT usuarios_roles_fk FOREIGN KEY (rol) REFERENCES roles(id) ON UPDATE CASCADE;
ALTER TABLE public.motos ADD CONSTRAINT motos_usuarios_fk FOREIGN KEY (id_propietario) REFERENCES usuarios(id) ON UPDATE CASCADE;

ALTER TABLE public.seguimientos ADD CONSTRAINT seguimientos_usuarios_fk FOREIGN KEY (id_mecanico) REFERENCES usuarios(id) ON UPDATE CASCADE;
ALTER TABLE public.seguimientos ADD CONSTRAINT seguimientos_motos_fk FOREIGN KEY (placa) REFERENCES motos(placa) ON UPDATE CASCADE;
