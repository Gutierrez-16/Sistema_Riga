package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.UsuarioModel;
import com.sistema.riga.sistema_riga_backend.repositories.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private IUsuarioRepository iUsuarioRepository;

    @Autowired
    private DataSource dataSource;

    @Override
    public Map<String, Object> authenticateUser(String logeo, String clave) throws Exception {
        return iUsuarioRepository.authenticateUser(logeo, clave);
    }



    @Override
    public List<UsuarioModel> getAllUsuarios() {
        return iUsuarioRepository.getAllUsuarios();
    }

    @Override
    public UsuarioModel getUsuarioById(int id) {
        return iUsuarioRepository.getUsuarioById(id);
    }

    @Override
    public String insertUsuario(UsuarioModel usuarioModel) {
        return iUsuarioRepository.insertUsuario(usuarioModel);
    }

    @Override
    public String updateUsuario(UsuarioModel usuarioModel) {
        return iUsuarioRepository.updateUsuario(usuarioModel);
    }

    @Override
    public String deleteUsuario(int id) {
        return iUsuarioRepository.deleteUsuario(id);
    }

    @Override
    public String activateUsuario(int id) {
        return iUsuarioRepository.activateUsuario(id);
    }


    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM Usuario WHERE Logeo = ?");
            statement.setString(1, username);
            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                String logeo = resultSet.getString("Logeo");
                String clave = resultSet.getString("Clave");
                String estado = resultSet.getString("EstadoUsuario");

                if ("0".equals(estado)) {
                    throw new UsernameNotFoundException("User is inactive");
                }

                return User.builder()
                        .username(logeo)
                        .password(clave)
                        .roles("ADMIN")
                        .roles("USER")
                        .build();
            } else {
                throw new UsernameNotFoundException("User not found with username: " + username);
            }
        } catch (SQLException e) {
            throw new UsernameNotFoundException("Database error", e);
        }
    }
}
