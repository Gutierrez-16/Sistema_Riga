package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.EmpleadoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
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
                    empleadoModel.setHoraEntrada(rs.getTimestamp("HoraEntrada"));
                    empleadoModel.setHoraSalida(rs.getTimestamp("HoraSalida"));
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
                    empleadoModel.setHoraEntrada(rs.getTimestamp("HoraEntrada"));
                    empleadoModel.setHoraSalida(rs.getTimestamp("HoraSalida"));
                    empleadoModel.setTurno(rs.getString("Turno"));
                    empleadoModel.setEstadoEmpleado(rs.getString("EstadoEmpleado"));
                    empleadoModel.setIdCargo(rs.getInt("IDCargo"));
                    empleadoModel.setIdPersona(rs.getInt("IDPersona"));
                    return empleadoModel;
                });
    }
}
