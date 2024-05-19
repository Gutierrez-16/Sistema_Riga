package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProvinciaRepository implements IProvinciaRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String insertProvincia(ProvinciaModel provinciaModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Provincia @NombreProv = ?, @IDDepartamento = ?, @Operation = 'C'",
                provinciaModel.getNombreProvincia(),
                provinciaModel.getIdDepartamento());
        return "provinciaModel";
    }


    @Override
    public String updateProvincia(ProvinciaModel provinciaModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Provincia @IDProvincia = ?,@NombreProv = ?, " +
                        "@EstadoProvincia = ?, @IDDepartamento = ?, @Operation = 'U';",
                provinciaModel.getIdProvincia(),
                provinciaModel.getNombreProvincia(),
                provinciaModel.getEstadoProvincia(),
                provinciaModel.getIdDepartamento());
        return "provinciaModel";
    }

    @Override
    public String deleteProvincia(int idProvincia) {
        jdbcTemplate.update("EXEC SP_CRUD_Provincia @IDProvincia = ?, @Operation = 'D';", idProvincia);
        // No necesitas pasar los otros parámetros si solo estás eliminando el producto
        return "provinciaModel";
    }

    @Override
    public List<ProvinciaModel> getProvinciasByDepartamento(int idDepartamento) {
        return jdbcTemplate.query("SELECT * FROM Provincia WHERE IDDepartamento = ?",
                new Object[]{idDepartamento},
                (rs, rowNum) -> {
                    ProvinciaModel provinciaModel = new ProvinciaModel();
                    provinciaModel.setIdProvincia(rs.getInt("IDProvincia"));
                    provinciaModel.setNombreProvincia(rs.getString("NombreProv"));
                    provinciaModel.setEstadoProvincia(rs.getString("EstadoProvincia"));
                    provinciaModel.setIdDepartamento(rs.getInt("IDDepartamento")); // Asegúrate de asignar correctamente el ID del departamento
                    return provinciaModel;
                });
    }

    @Override
    public ProvinciaModel getProvinciaById(int id) {
        return jdbcTemplate.queryForObject("EXEC SP_CRUD_Provincia @IDProvincia = ?, @Operation = 'R'",
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
}
