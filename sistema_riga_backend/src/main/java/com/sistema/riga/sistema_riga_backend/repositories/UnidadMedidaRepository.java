package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.UnidadMedidaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UnidadMedidaRepository implements IUnidadMedidaRepositry{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String insertUnidadMedida(UnidadMedidaModel unidadMedidaModel) {
        jdbcTemplate.update("EXEC SP_CRUD_UnidadMedida @NombreUnidadMedida = ?,  @Operation = 'C'",
                unidadMedidaModel.getNombreUnidadMedida());
        return "unidadMedidaModel";
    }


    @Override
    public String updateUnidadMedida(UnidadMedidaModel unidadMedidaModel) {
        jdbcTemplate.update("EXEC SP_CRUD_UnidadMedida @IDUnidadMedida = ?, @NombreUnidadMedida = ?, " +
                        "@EstadoUnidadMedida = ?, @Operation = 'U'",
                unidadMedidaModel.getIdUnidadMedida(),
                unidadMedidaModel.getNombreUnidadMedida(),
                unidadMedidaModel.getEstadoUnidadMedida());
        return "unidadMedidaModel";
    }

    @Override
    public String deleteUnidadMedida(int idUnidadMedida) {
        jdbcTemplate.update("EXEC SP_CRUD_UnidadMedida @IDUnidadMedida = ?, @Operation = 'D';", idUnidadMedida);
        return "unidadMedidaModel";
    }

    @Override
    public UnidadMedidaModel getUnidadMedidaById(int id) {
        return jdbcTemplate.queryForObject("EXEC SP_CRUD_UnidadMedida @IDUnidadMedida = ?,@Operation = 'R'",
                new Object[]{id},
                (rs, rowNum) -> {
                    UnidadMedidaModel unidadMedidaModel = new UnidadMedidaModel();
                    unidadMedidaModel.setIdUnidadMedida(rs.getInt(1));
                    unidadMedidaModel.setNombreUnidadMedida(rs.getString(2));
                    unidadMedidaModel.setEstadoUnidadMedida(rs.getString(3));
                    return unidadMedidaModel;
                });
    }

    @Override
    public List<UnidadMedidaModel> getAllUnidadMedidas() {
        return jdbcTemplate.query("SELECT * FROM UnidadMedida;",
                (rs, rowNum) -> {
                    UnidadMedidaModel unidadMedidaModel = new UnidadMedidaModel();
                    unidadMedidaModel.setIdUnidadMedida(rs.getInt(1));
                    unidadMedidaModel.setNombreUnidadMedida(rs.getString(2));
                    unidadMedidaModel.setEstadoUnidadMedida(rs.getString(3));
                    return unidadMedidaModel;
                });
    }
    @Override
    public String activateUnidadMedida(int id) {
        jdbcTemplate.update("UPDATE UnidadMedida SET EstadoUnidadMedida = '1' WHERE IDUnidadMedida = ?;", id);
        return "unidadMedidaModel";
    }
}
