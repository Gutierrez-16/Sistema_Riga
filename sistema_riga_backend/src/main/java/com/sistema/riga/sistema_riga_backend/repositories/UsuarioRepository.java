package com.sistema.riga.sistema_riga_backend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UsuarioRepository implements IUsuarioRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int validateUser(String username, String password) {
        String sql = "EXEC SP_Login ?, ?";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, username, password);
        return count;
    }
}
