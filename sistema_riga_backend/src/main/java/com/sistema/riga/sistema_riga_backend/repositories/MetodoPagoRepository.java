package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.MetodoPagoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MetodoPagoRepository implements IMetodoPagoRepositry {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String insertMetodoPago(MetodoPagoModel metodoPagoModel) {
        jdbcTemplate.update("EXEC SP_CRUD_MetodoPago @NombreMetodo= ?,  @Operation = 'C'",
                metodoPagoModel.getNombreMetodo());
        return "MetodoPagoModel";
    }


    @Override
    public String updateMetodoPago(MetodoPagoModel metodoPagoModel) {
        jdbcTemplate.update("EXEC SP_CRUD_MetodoPago @IDMetodoPago = ?, @NombreMetodo = ?, " +
                        "@EstadoMetodo = ?, @Operation = 'U'",
                metodoPagoModel.getIdMetodo(),
                metodoPagoModel.getNombreMetodo(),
                metodoPagoModel.getEstadoMetodo());
        return "metodoPagoModel";
    }

    @Override
    public String deleteMetodoPago(int idMetodo) {
        jdbcTemplate.update("EXEC SP_CRUD_MetodoPago @IDMetodoPago = ?, @Operation = 'D';", idMetodo);
        return "metodoPagoModel";
    }

    @Override
    public MetodoPagoModel getMetodoPagoById(int id) {
        return jdbcTemplate.queryForObject("EXEC SP_CRUD_MetodoPago @IDMetodoPago = ?,@Operation = 'R'",
                new Object[]{id},
                (rs, rowNum) -> {
                    MetodoPagoModel metodoPagoModel = new MetodoPagoModel();
                    metodoPagoModel.setIdMetodo(rs.getInt(1));
                    metodoPagoModel.setNombreMetodo(rs.getString(2));
                    metodoPagoModel.setEstadoMetodo(rs.getString(3));
                    return metodoPagoModel;
                });
    }

    @Override
    public List<MetodoPagoModel> getAllMetodoPagos() {
        return jdbcTemplate.query("EXEC SP_CRUD_MetodoPago @Operation = 'R'",
                (rs, rowNum) -> {
                    MetodoPagoModel metodoPagoModel = new MetodoPagoModel();
                    metodoPagoModel.setIdMetodo(rs.getInt(1));
                    metodoPagoModel.setNombreMetodo(rs.getString(2));
                    metodoPagoModel.setEstadoMetodo(rs.getString(3));
                    return metodoPagoModel;
                });
    }
}
