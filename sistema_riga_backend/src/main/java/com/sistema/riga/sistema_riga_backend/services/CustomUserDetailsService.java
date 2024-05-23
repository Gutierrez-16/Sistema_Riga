package com.sistema.riga.sistema_riga_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
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
