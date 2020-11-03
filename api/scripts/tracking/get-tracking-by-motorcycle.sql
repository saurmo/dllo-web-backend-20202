
select s.*, concat(u2.nombre, ' ', u2.apellido ) nombre_mecanico from seguimientos s 
inner join usuarios u2 on u2.id = s.id_mecanico 
where s.placa  = $1