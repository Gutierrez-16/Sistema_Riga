package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.UsuarioDataModel;
import com.sistema.riga.sistema_riga_backend.models.UsuarioModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UsuarioDataRepository implements IUsuarioDataRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public UsuarioDataModel getDataByUsuario(String usuario) {

        return jdbcTemplate.queryForObject("EXEC SP_DatosPorUsuario @Logeo = ?;",
                new Object[]{usuario},
                (rs, rowNum) -> {
                    UsuarioDataModel usuarioDataModel = new UsuarioDataModel();
                    usuarioDataModel.setIdUsuario(rs.getInt(1));
                    usuarioDataModel.setNombre(rs.getString(2));
                    usuarioDataModel.setApePaterno(rs.getString(3));
                    usuarioDataModel.setApeMaterno(rs.getString(4));
                    System.out.println(usuarioDataModel);
                    return usuarioDataModel;
                });
    }
}
