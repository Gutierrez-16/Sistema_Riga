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
    public String insertDistrito(DistritoModel distritoModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Distrito @NombreDist = ?, @IDProvincia = ?, @Operation = 'C'",
                distritoModel.getNombreDistrito(),
                distritoModel.getIdProvincia());
        return "distritoModel";
    }
    @Override
    public DistritoModel getDistritoByName(String nombreDistrito) {
        return jdbcTemplate.queryForObject("SELECT * FROM Distrito WHERE NombreDist = ?",
                new Object[]{nombreDistrito},
                (rs, rowNum) -> {
                    DistritoModel distritoModel = new DistritoModel();
                    distritoModel.setIdDistrito(rs.getInt("IDDistrito"));
                    distritoModel.setNombreDistrito(rs.getString("NombreDist"));
                    distritoModel.setEstadoDistrito(rs.getString("EstadoDistrito"));
                    distritoModel.setIdProvincia(rs.getInt("IDProvincia"));
                    return distritoModel;
                });
    }

    @Override
    public String updateDistrito(DistritoModel distritoModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Distrito @IDDistrito = ?,@NombreDist = ?, " +
                        "@EstadoDistrito = ?, @IDProvincia = ?, @Operation = 'U';",
                distritoModel.getIdDistrito(),
                distritoModel.getNombreDistrito(),
                distritoModel.getEstadoDistrito(),
                distritoModel.getIdProvincia());
        return "distritoModel";
    }

    @Override
    public String deleteDistrito(int idDistrito) {
        jdbcTemplate.update("EXEC SP_CRUD_Distrito @IDDistrito = ?, @Operation = 'D';", idDistrito);
        // No necesitas pasar los otros parámetros si solo estás eliminando el distrito
        return "distritoModel";
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


    @Override
    public DistritoModel getDistritoById(int id) {
        return jdbcTemplate.queryForObject("EXEC SP_CRUD_Distrito @IDDistrito = ?, @Operation = 'R'",
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
}
