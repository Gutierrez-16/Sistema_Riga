package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.DetallePedidoModel;
import com.sistema.riga.sistema_riga_backend.models.VentaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.Types;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@Repository
public class VentaRepository implements IVentaRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = Logger.getLogger(VentaRepository.class.getName());

    @Override
    public int insertarVenta(VentaModel ventaModel) {
        try {
            SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withProcedureName("SP_InsertarVenta")
                    .declareParameters(
                            new SqlParameter("Descuento", Types.DOUBLE),
                            new SqlParameter("IGV", Types.DOUBLE),
                            new SqlParameter("Total", Types.DOUBLE),
                            new SqlParameter("Subtotal", Types.DOUBLE),
                            new SqlParameter("TotalDescuento", Types.DOUBLE),
                            new SqlParameter("TotalPagar", Types.DOUBLE),
                            new SqlParameter("TipoComprobante", Types.VARCHAR),
                            new SqlParameter("IDCliente", Types.INTEGER),
                            new SqlParameter("IDPedido", Types.INTEGER),
                            new SqlParameter("IDUsuario", Types.INTEGER),
                            new SqlParameter("IDMetodoPago", Types.INTEGER),
                            new SqlOutParameter("idVenta", Types.INTEGER)
                    );

            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("Descuento", ventaModel.getDescuento());
            paramMap.put("IGV", ventaModel.getIgv());
            paramMap.put("Total", ventaModel.getTotal());
            paramMap.put("Subtotal", ventaModel.getSubtotal());
            paramMap.put("TotalDescuento", ventaModel.getTotalDescuento());
            paramMap.put("TotalPagar", ventaModel.getTotalPagar());
            paramMap.put("TipoComprobante", ventaModel.getTipoComprobante());
            paramMap.put("IDCliente", ventaModel.getIdCliente());
            paramMap.put("IDPedido", ventaModel.getIdPedido());
            paramMap.put("IDUsuario", ventaModel.getIdUsuario());
            paramMap.put("IDMetodoPago", ventaModel.getIdMetodoPago());

            Map<String, Object> out = jdbcCall.execute(paramMap);
            System.out.println(out);

            List<Map<String, Object>> result = (List<Map<String, Object>>) out.get("#result-set-1");
            Map<String, Object> row = result.get(0);
            Integer idVenta = (Integer) row.get("idVenta"); // Aquí ajustamos para recibir un Integer

            return idVenta;
        } catch (DataAccessException e) {
            throw new RuntimeException("Error al insertar la venta: " + e.getMessage(), e);
        }
    }
}

