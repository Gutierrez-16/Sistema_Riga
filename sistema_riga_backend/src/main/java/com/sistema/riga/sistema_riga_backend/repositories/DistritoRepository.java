package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.DistritoModel;
import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DistritoRepository implements IDistritoRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public DistritoModel getDistritoById(int id) {
        return jdbcTemplate.queryForObject("SELECT * FROM Distrito WHERE IDDistrito = ?",
                new Object[]{id},
                (rs, rowNum) -> {
                    DistritoModel distritoModel = new DistritoModel();
                    distritoModel.setIdDistrito(rs.getInt("IDDistrito"));
                    distritoModel.setNombreDistrito(rs.getString("NombreDist"));
                    distritoModel.setEstadoDistrito(rs.getString("EstadoDistrito"));
                    distritoModel.setIdProvincia(rs.getInt("IDProvincia")); // Asegúrate de asignar correctamente el ID de la provincia
                    return distritoModel;
                });
    }

    @Override
    public List<DistritoModel> getAllDistritos() {
        return jdbcTemplate.query("Select * from Distrito",
                (rs, rowNum) -> {
                    DistritoModel distritoModel = new DistritoModel();
                    distritoModel.setIdDistrito(rs.getInt("IDDistrito"));
                    distritoModel.setNombreDistrito(rs.getString("NombreDist"));
                    distritoModel.setEstadoDistrito(rs.getString("EstadoDistrito"));
                    distritoModel.setIdProvincia(rs.getInt("IDProvincia")); // Asegúrate de asignar correctamente el ID de la provincia
                    return distritoModel;
                });
    }

    @Override
    public List<DistritoModel> getDistritosByProvincia(int idProvincia) {
        return jdbcTemplate.query("SELECT * FROM Distrito WHERE IDProvincia = ?",
                new Object[]{idProvincia},
                (rs, rowNum) -> {
                    DistritoModel distritoModel = new DistritoModel();
                    distritoModel.setIdDistrito(rs.getInt("IDDistrito"));
                    distritoModel.setNombreDistrito(rs.getString("NombreDist"));
                    distritoModel.setEstadoDistrito(rs.getString("EstadoDistrito"));
                    distritoModel.setIdProvincia(rs.getInt("IDProvincia")); // Asegúrate de asignar correctamente el ID de la provincia
                    return distritoModel;
                });
    }
}
