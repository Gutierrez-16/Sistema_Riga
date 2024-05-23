package com.sistema.riga.sistema_riga_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> authenticateUser(String logeo, String clave) {
        String sql = "EXEC sp_LoginUsuario ?, ?";
        return jdbcTemplate.queryForMap(sql, logeo, clave);
    }
}


