package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProvinciaRepository implements IProvinciaRepository {

    public static String GET_PROVINCIA_DISTRITO = "SELECT \n" +
            "\tp.IDProvincia, \n" +
            "\tp.NombreProv\n" +
            "FROM \n" +
            "\tProvincia p \n" +
            "INNER JOIN \n" +
            "\tDistrito d\n" +
            "ON p.IDProvincia = d.IDProvincia\n" +
            "WHERE d.IDDistrito = ?";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<ProvinciaModel> getProvinciasByDepartamento(int idDepartamento) {
        return jdbcTemplate.query("SELECT * FROM Provincia WHERE IDDepartamento = ?",
                new Object[]{idDepartamento},
                (rs, rowNum) -> {
                    ProvinciaModel provinciaModel = new ProvinciaModel();
                    provinciaModel.setIdProvincia(rs.getInt(1));
                    provinciaModel.setNombreProvincia(rs.getString(2));
                    provinciaModel.setEstadoProvincia(rs.getString(3));
                    provinciaModel.setIdDepartamento(rs.getInt(4)); // Asegúrate de asignar correctamente el ID del departamento
                    return provinciaModel;
                });
    }

    @Override
    public ProvinciaModel getProvinciaById(int id) {
        return jdbcTemplate.queryForObject("SELECT * FROM Provincia WHERE IDProvincia = ?",
                new Object[]{id},
                (rs, rowNum) -> {
                    ProvinciaModel provinciaModel = new ProvinciaModel();
                    provinciaModel.setIdProvincia(rs.getInt("IDProvincia"));
                    provinciaModel.setNombreProvincia(rs.getString("NombreProv"));
                    provinciaModel.setEstadoProvincia(rs.getString("EstadoProvincia"));
                    provinciaModel.setIdDepartamento(rs.getInt("IDDepartamento"));// Aquí asigna el nombre del departamento al campo correcto
                    return provinciaModel;
                });
    }

    @Override
    public List<ProvinciaModel> getAllProvincias() {
        return jdbcTemplate.query("Select * from Provincia",
                (rs, rowNum) -> {
                    ProvinciaModel provinciaModel = new ProvinciaModel();
                    provinciaModel.setIdProvincia(rs.getInt("IDProvincia"));
                    provinciaModel.setNombreProvincia(rs.getString("NombreProv"));
                    provinciaModel.setEstadoProvincia(rs.getString("EstadoProvincia"));
                    provinciaModel.setIdDepartamento(rs.getInt("IDDepartamento"));// Aquí asigna el nombre del departamento al campo correcto
                    return provinciaModel;
                });
    }

    @Override
    public ProvinciaModel getProvinciaByDistrito(int idDistrito) {
        return jdbcTemplate.queryForObject(GET_PROVINCIA_DISTRITO,
                new Object[]{idDistrito},
                (rs, rowNum) -> {
                    ProvinciaModel provinciaModel = new ProvinciaModel();
                    provinciaModel.setIdProvincia(rs.getInt(1));
                    provinciaModel.setNombreProvincia(rs.getString(2));
                    return provinciaModel;
                });
    }
}
