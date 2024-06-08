package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.TipoUsuarioModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TipoUsuarioRepository implements ITipoUsuarioRepositry{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String insertTipoUsuario(TipoUsuarioModel tipoUsuarioModel) {
        jdbcTemplate.update("EXEC [SP_CRUD_TipoUsuario] @NomTipo = ?,  @Operation = 'C'",
                tipoUsuarioModel.getNombreTipoUsuario());
        return "tipoUsuarioModel";
    }


    @Override
    public String updateTipoUsuario(TipoUsuarioModel tipoUsuarioModel) {
        jdbcTemplate.update("EXEC SP_CRUD_TipoUsuario @IDTipoUsuario = ?, @NomTipo = ?, " +
                        "@EstadoTipoUsuario = ?, @Operation = 'U'",
                tipoUsuarioModel.getIdTipoUsuario(),
                tipoUsuarioModel.getNombreTipoUsuario(),
                tipoUsuarioModel.getEstadoTipoUsuario());
        return "tipoUsuarioModel";
    }

    @Override
    public String deleteTipoUsuario(int idTipoUsuario) {
        jdbcTemplate.update("EXEC SP_CRUD_TipoUsuario @IDTipoUsuario = ?, @Operation = 'D';", idTipoUsuario);
        return "tipoUsuarioModel";
    }

    @Override
    public TipoUsuarioModel getTipoUsuarioById(int id) {
        return jdbcTemplate.queryForObject("EXEC SP_CRUD_TipoUsuario @IDTipoUsuario = ?,@Operation = 'R'",
                new Object[]{id},
                (rs, rowNum) -> {
                    TipoUsuarioModel tipoUsuarioModel = new TipoUsuarioModel();
                    tipoUsuarioModel.setIdTipoUsuario(rs.getInt(1));
                    tipoUsuarioModel.setNombreTipoUsuario(rs.getString(2));
                    tipoUsuarioModel.setEstadoTipoUsuario(rs.getString(3));
                    return tipoUsuarioModel;
                });
    }

    @Override
    public List<TipoUsuarioModel> getAllTipoUsuarios() {
        return jdbcTemplate.query("EXEC SP_CRUD_TipoUsuario @Operation = 'R'",
                (rs, rowNum) -> {
                    TipoUsuarioModel tipoUsuarioModel = new TipoUsuarioModel();
                    tipoUsuarioModel.setIdTipoUsuario(rs.getInt(1));
                    tipoUsuarioModel.setNombreTipoUsuario(rs.getString(2));
                    tipoUsuarioModel.setEstadoTipoUsuario(rs.getString(3));
                    return tipoUsuarioModel;
                });
    }

    @Override
    public String activateTipoUsuario(int id) {
        jdbcTemplate.update("UPDATE TipoUsuario SET estadoTipoUsuario = '1' WHERE idTipoUsuario = ?;", id);
        return "tipoUsuarioModel";
    }
}
