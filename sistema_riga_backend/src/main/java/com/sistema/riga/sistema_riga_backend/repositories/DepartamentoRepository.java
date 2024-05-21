package com.sistema.riga.sistema_riga_backend.repositories;


import com.sistema.riga.sistema_riga_backend.models.DepartamentoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartamentoRepository implements IDepartamentoRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public static String GET_DEPARTAMENTO_PROVINCIA = "SELECT d.IDDepartamento, d.NombreDep " +
                                                    "FROM Departamento d INNER JOIN Provincia p " +
                                                    "ON d.IDDepartamento = p.IDDepartamento " +
                                                    "WHERE p.NombreProv = ?";

    @Override
    public String insertDepartamento(DepartamentoModel departamentoModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Departamento @NombreDep = ?, @Operation = 'C'",
                departamentoModel.getNombreDepartamento());
        return "departamentoModel";
    }


    @Override
    public String updateDepartamento(DepartamentoModel departamentoModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Departamento @IDDepartamento = ?, @NombreDep = ?, @EstadoDepartamento = ?, @Operation = 'U'",
                departamentoModel.getIdDepartamento(),
                departamentoModel.getNombreDepartamento(),
                departamentoModel.getEstadoDepartamento());
        return "departamentoModel";
    }

    @Override
    public String deleteDepartamento(int idDepartamento) {
        jdbcTemplate.update("EXEC SP_CRUD_Departamento @IDDepartamento = ?, @Operation = 'D';", idDepartamento);
        return "departamentoModel";
    }

    @Override
    public DepartamentoModel getDepartamentoById(int id) {
        return jdbcTemplate.queryForObject("EXEC SP_CRUD_Departamento @IDDepartamento = ?, @Operation = 'R'",
                new Object[]{id},
                (rs, rowNum) -> {
                    DepartamentoModel departamentoModel = new DepartamentoModel();
                    departamentoModel.setIdDepartamento(rs.getInt("IDDepartamento"));
                    departamentoModel.setNombreDepartamento(rs.getString("NombreDep"));
                    departamentoModel.setEstadoDepartamento(rs.getString("EstadoDepartamento"));
                    return departamentoModel;
                });
    }

    @Override
    public List<DepartamentoModel> getAllDepartamentos() {
        return jdbcTemplate.query("SELECT * FROM Departamento",
                (rs, rowNum) -> {
                    DepartamentoModel departamentoModel = new DepartamentoModel();
                    departamentoModel.setIdDepartamento(rs.getInt("IDDepartamento"));
                    departamentoModel.setNombreDepartamento(rs.getString("NombreDep"));
                    departamentoModel.setEstadoDepartamento(rs.getString("EstadoDepartamento"));
                    return departamentoModel;
                });
    }

    @Override
    public DepartamentoModel getDepartamentoByProvincia(String provinciaNombre) {
        return jdbcTemplate.queryForObject(GET_DEPARTAMENTO_PROVINCIA,
                new Object[]{provinciaNombre},
                (rs, rowNum) -> {
                    DepartamentoModel departamentoModel = new DepartamentoModel();
                    departamentoModel.setIdDepartamento(rs.getInt(1));
                    departamentoModel.setNombreDepartamento(rs.getString(2));
                    return departamentoModel;
                });
    }
}
