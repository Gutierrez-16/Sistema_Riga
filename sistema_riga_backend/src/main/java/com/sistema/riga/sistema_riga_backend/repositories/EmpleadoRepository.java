package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.CargoModel;
import com.sistema.riga.sistema_riga_backend.models.EmpleadoModel;
import com.sistema.riga.sistema_riga_backend.models.PersonaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EmpleadoRepository implements IEmpleadoRepositry{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String insertEmpleado(EmpleadoModel empleadoModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Empleado @Sueldo = ?, @FechaIng = ?, @HoraEntrada = ?," +
                 " @HoraSalida = ?, @Turno = ?, @EstadoEmpleado = ?, @IDCargo = ?, " +
                        "@IDPersona = ?, @Operation = 'C'",
                empleadoModel.getSueldo(),
                empleadoModel.getFechaIng(),
                empleadoModel.getHoraEntrada(),
                empleadoModel.getHoraSalida(),
                empleadoModel.getTurno(),
                empleadoModel.getEstadoEmpleado(),
                empleadoModel.getIdCargo(),
                empleadoModel.getIdPersona());
        return "empleadoModel";
    }


    @Override
    public String updateEmpleado(EmpleadoModel empleadoModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Empleado @IDEmpleado = ?, @Sueldo = ?, @FechaIng = ?, @HoraEntrada = ?," +
                        " @HoraSalida = ?, @Turno = ?, @EstadoEmpleado = ?, @IDCargo = ?, @IDPersona = ?, @Operation = 'U'",
                empleadoModel.getIdEmpleado(),
                empleadoModel.getSueldo(),
                empleadoModel.getFechaIng(),
                empleadoModel.getHoraEntrada(),
                empleadoModel.getHoraSalida(),
                empleadoModel.getTurno(),
                empleadoModel.getEstadoEmpleado(),
                empleadoModel.getIdCargo(),
                empleadoModel.getIdPersona());
        return "empresaModel";
    }

    @Override
    public String deleteEmpleado(int idEmpleado) {
        jdbcTemplate.update("EXEC SP_CRUD_Empleado @IDEmpleado = ?, @Operation = 'D';", idEmpleado);
        return "empresaModel";
    }

    @Override
    public EmpleadoModel getEmpleadoById(int id) {
        return jdbcTemplate.queryForObject("EXEC SP_CRUD_Empleado @IDEmpleado = ?, @Operation = 'R'",
                new Object[]{id},
                (rs, rowNum) -> {
                    EmpleadoModel empleadoModel = new EmpleadoModel();
                    empleadoModel.setIdEmpleado(rs.getInt("IDEmpleado"));
                    empleadoModel.setSueldo(rs.getDouble("Sueldo"));
                    empleadoModel.setFechaIng(rs.getDate("FechaIng"));
                    empleadoModel.setHoraEntrada(rs.getTime("HoraEntrada"));
                    empleadoModel.setHoraSalida(rs.getTime("HoraSalida"));
                    empleadoModel.setTurno(rs.getString("Turno"));
                    empleadoModel.setEstadoEmpleado(rs.getString("EstadoEmpleado"));
                    empleadoModel.setIdCargo(rs.getInt("IDCargo"));
                    empleadoModel.setIdPersona(rs.getInt("IDPersona"));
                    return empleadoModel;
                });
    }

    @Override
    public List<EmpleadoModel> getAllEmpleados() {
        return jdbcTemplate.query("SELECT * FROM Empleado",
                (rs, rowNum) -> {
                    EmpleadoModel empleadoModel = new EmpleadoModel();
                    empleadoModel.setIdEmpleado(rs.getInt("IDEmpleado"));
                    empleadoModel.setSueldo(rs.getDouble("Sueldo"));
                    empleadoModel.setFechaIng(rs.getDate("FechaIng"));
                    empleadoModel.setHoraEntrada(rs.getTime("HoraEntrada"));
                    empleadoModel.setHoraSalida(rs.getTime("HoraSalida"));
                    empleadoModel.setTurno(rs.getString("Turno"));
                    empleadoModel.setEstadoEmpleado(rs.getString("EstadoEmpleado"));
                    empleadoModel.setIdCargo(rs.getInt("IDCargo"));
                    empleadoModel.setIdPersona(rs.getInt("IDPersona"));
                    return empleadoModel;
                });
    }

    @Override
    public List<CargoModel> getAllCargos() {
        return jdbcTemplate.query("SELECT * FROM Cargo",
                (rs, rowNum) -> {
                    CargoModel cargoModel = new CargoModel();
                    cargoModel.setIdCargo(rs.getInt(1));
                    cargoModel.setNombreCargo(rs.getString(2));
                    cargoModel.setEstadoCargo(rs.getString(3));
                    return cargoModel;
                });
    }

    @Override
    public List<PersonaModel> getAllPersonas() {
        return jdbcTemplate.query("SELECT * FROM Persona",
                (rs, rowNum) -> {
                    PersonaModel personaModel = new PersonaModel();
                    personaModel.setIdPersona(rs.getInt("IDPersona"));
                    personaModel.setDni(rs.getString("DNI"));
                    personaModel.setNombrePersona(rs.getString("Nombre"));
                    personaModel.setApePaterno(rs.getString("Ape_Pat"));
                    personaModel.setApeMaterno(rs.getString("Ape_Mat"));
                    personaModel.setGenero(rs.getString("Genero"));
                    personaModel.setFechaNac(rs.getDate("Fecha_Nac"));
                    personaModel.setCorreo(rs.getString("Correo"));
                    personaModel.setCelular(rs.getString("Celular"));
                    personaModel.setDireccion(rs.getString("Direccion"));
                    personaModel.setEstadoPersona(rs.getString("EstadoPersona"));
                    personaModel.setIdDistrito(rs.getInt("IDDistrito"));
                    return personaModel;
                });
    }

    @Override
    public String activateEmpleado(int id) {
        jdbcTemplate.update("UPDATE Empleado SET EstadoEmpleado = '1' WHERE IDEmpleado = ?;", id);
        return "empleadoModel";
    }
}
