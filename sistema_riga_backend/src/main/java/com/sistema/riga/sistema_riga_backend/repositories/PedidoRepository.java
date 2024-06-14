package com.sistema.riga.sistema_riga_backend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.util.List;
import java.util.Map;

@Repository
public class PedidoRepository implements IPedidoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int insertarPedido() {
        try {
            SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withProcedureName("SP_InsertarPedido");

            Map<String, Object> out = jdbcCall.execute();

            List<Map<String, Object>> result = (List<Map<String, Object>>) out.get("#result-set-1");
            Map<String, Object> row = result.get(0);
            Integer idPedido = (Integer) row.get("idPedido");

            return idPedido;
        } catch (DataAccessException e) {
            throw new RuntimeException("Error al insertar el pedido: " + e.getMessage(), e);
        }
    }

}