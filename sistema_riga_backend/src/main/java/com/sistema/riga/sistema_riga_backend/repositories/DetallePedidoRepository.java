package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.DetallePedidoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

@Repository
public class DetallePedidoRepository implements IDetallePedidoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String insertarDetallePedido(int idPedido, DetallePedidoModel detallePedidoModel) {
        try {
            System.out.println(detallePedidoModel);
            System.out.println(idPedido);

            SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withProcedureName("SP_InsertarDetallesPedido")
                    .declareParameters(
                            new SqlParameter("Cantidad", Types.INTEGER),
                            new SqlParameter("Precio", Types.DOUBLE), // Cambiar el tipo de datos del precio
                            new SqlParameter("IDProducto", Types.INTEGER),
                            new SqlParameter("IDUsuario", Types.INTEGER),
                            new SqlParameter("IDPedido", Types.INTEGER)
                    );

            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("Cantidad", detallePedidoModel.getCantidad());
            paramMap.put("Precio", detallePedidoModel.getPrecio()); // Asegúrate de que getPrecio() devuelve un Double
            paramMap.put("IDProducto", detallePedidoModel.getIdProducto());
            paramMap.put("IDUsuario", detallePedidoModel.getIdUsuario());
            paramMap.put("IDPedido", idPedido);

            SqlParameterSource in = new MapSqlParameterSource(paramMap);

            jdbcCall.execute(in);

            return "Detalle del pedido insertado correctamente";
        } catch (DataAccessException e) {
            return "Error al insertar el detalle del pedido: " + e.getMessage();
        }
    }

}
