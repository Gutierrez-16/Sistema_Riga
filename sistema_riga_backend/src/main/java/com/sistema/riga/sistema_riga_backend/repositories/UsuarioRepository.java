package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.UsuarioModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class UsuarioRepository implements IUsuarioRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public Map<String, Object> authenticateUser(String logeo, String clave) throws Exception {
        String sql = "EXEC sp_LoginUsuario ?, ?";

        Map<String, Object> user = jdbcTemplate.queryForMap(sql, logeo, clave);

        if (user == null || !passwordEncoder.matches(clave, user.get("Clave").toString())) {
            throw new Exception("Invalid credentials");
        }

        return user;
    }

    @Override
    public String insertUsuario(UsuarioModel usuarioModel) {
        jdbcTemplate.update("EXEC [SP_CRUD_Usuario] @Logeo = ?, @Clave = ?, @IDEmpleado = ?, " +
                        "@IDTipoUsuario = ?,  @Operation = 'C'",
                usuarioModel.getUsername(),
                usuarioModel.getPassword(),
                usuarioModel.getIdEmpleado(),
                usuarioModel.getIdTipoUsuario());
        return "UsuarioModel";
    }

    @Override
    public String updateUsuario(UsuarioModel usuarioModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Usuario @IDUsuario=?, @Logeo = ?, @Clave = ?, @EstadoUsuario=?, " +
                        "@IDEmpleado = ?, @IDTipoUsuario = ?, @Operation = 'U'",
                usuarioModel.getIDUsuario(),
                usuarioModel.getUsername(),
                usuarioModel.getPassword(),
                usuarioModel.getEstadoUsuario(),
                usuarioModel.getIdEmpleado(),
                usuarioModel.getIdTipoUsuario());
        return "usuarioModel";
    }


    @Override
    public String deleteUsuario(int idUsuario) {
        jdbcTemplate.update("EXEC SP_CRUD_Usuario @IDUsuario = ?, @Operation = 'D';", idUsuario);
        return "usuarioModel";
    }

    @Override
    public UsuarioModel getUsuarioById(int id) {
        return jdbcTemplate.queryForObject("EXEC SP_CRUD_Usuario @IDUsuario = ?,@Operation = 'R'",
                new Object[]{id},
                (rs, rowNum) -> {
                    UsuarioModel usuarioModel = new UsuarioModel();
                    usuarioModel.setIDUsuario(rs.getInt(1));
                    usuarioModel.setUsername(rs.getString(2));
                    usuarioModel.setPassword(rs.getString(3));
                    usuarioModel.setEstadoUsuario(rs.getString(4));
                    usuarioModel.setIdEmpleado(rs.getInt(5));
                    usuarioModel.setIdTipoUsuario(rs.getInt(6));
                    return usuarioModel;
                });
    }




    @Override
    public List<UsuarioModel> getAllUsuarios() {
        return jdbcTemplate.query("EXEC SP_CRUD_Usuario @Operation = 'R'",
                (rs, rowNum) -> {
                    UsuarioModel usuarioModel = new UsuarioModel();
                    usuarioModel.setIDUsuario(rs.getInt(1));
                    usuarioModel.setUsername(rs.getString(2));
                    usuarioModel.setPassword(rs.getString(3));
                    usuarioModel.setEstadoUsuario(rs.getString(4));
                    usuarioModel.setIdEmpleado(rs.getInt(5));
                    usuarioModel.setIdTipoUsuario(rs.getInt(6));
                    return usuarioModel;
                });
    }

    @Override
    public String activateUsuario(int id) {
        jdbcTemplate.update("EXEC SP_CRUD_Usuario @IDUsuario = ?, @Operation = 'A';", id);
        return "usuarioModel";
    }
}
