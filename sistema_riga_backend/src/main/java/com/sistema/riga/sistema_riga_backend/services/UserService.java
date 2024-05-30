package com.sistema.riga.sistema_riga_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Map<String, Object> authenticateUser(String logeo, String clave) throws Exception {
        String sql = "EXEC sp_LoginUsuario ?, ?";
        Map<String, Object> user = jdbcTemplate.queryForMap(sql, logeo, clave);

        if (user == null || !passwordEncoder.matches(clave, user.get("Clave").toString())) {
            throw new Exception("Invalid credentials");
        }

        return user;
    }
}
