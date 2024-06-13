package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Repository
public class VentaRepository implements IVentaRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = Logger.getLogger(VentaRepository.class.getName());

    @Override
    public ComprobanteModel insertarVenta(VentaModel ventaModel) {
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
            Integer idVenta = (Integer) row.get("idVenta");

            // Llama al método para obtener el comprobante por el ID de la venta
            ComprobanteModel comprobante = getComprobanteById(idVenta);

            return comprobante;
        } catch (DataAccessException e) {
            throw new RuntimeException("Error al insertar la venta: " + e.getMessage(), e);
        }
    }

    @Override
    public ComprobanteModel getComprobanteById(int id) {
        return jdbcTemplate.query(
                "EXEC [SP_Comprobante] @IDVenta = ? ",
                new Object[]{id},
                rs -> {
                    if (rs.next()) {
                        ComprobanteModel comprobanteModel = new ComprobanteModel();
                        comprobanteModel.setIdVenta(rs.getInt("IDVenta"));
                        comprobanteModel.setFechaVenta(rs.getTimestamp("FechaVenta"));
                        comprobanteModel.setDescuento(rs.getDouble("Descuento"));
                        comprobanteModel.setIgv(rs.getDouble("IGV"));
                        comprobanteModel.setTotal(rs.getDouble("Total"));
                        comprobanteModel.setSubTotal(rs.getDouble("Subtotal"));
                        comprobanteModel.setTotalDescuento(rs.getDouble("TotalDescuento"));
                        comprobanteModel.setTipoComprobante(rs.getString("TipoComprobante"));
                        comprobanteModel.setNumero(rs.getString("Numero"));
                        comprobanteModel.setSerie(rs.getString("Serie"));
                        comprobanteModel.setIdCliente(rs.getInt("IDCliente"));
                        comprobanteModel.setNomCli(rs.getString("NomCliente"));
                        comprobanteModel.setDocCli(rs.getString("DocCliente"));
                        comprobanteModel.setDireccion(rs.getString("Direccion"));
                        comprobanteModel.setIdPedido(rs.getInt("IDPedido"));
                        comprobanteModel.setNombreMetodo(rs.getString("NombreMetodo"));

                        List<DetallePedidosModel> detallesPedido = new ArrayList<>();
                        do {
                            DetallePedidosModel detalle = new DetallePedidosModel();
                            detalle.setNomProducto(rs.getString("NombreProducto"));
                            detalle.setCant(rs.getInt("Cant"));
                            detalle.setPrecioUnitario(rs.getDouble("PrecioUnitario"));
                            detalle.setTotalPro(rs.getDouble("TotalPro"));
                            detallesPedido.add(detalle);
                        } while (rs.next() && rs.getInt("IDVenta") == id);

                        comprobanteModel.setDetallesPedido(detallesPedido);
                        return comprobanteModel;
                    } else {
                        return null; // O lanza una excepción si prefieres
                    }
                }
        );
    }
    @Override
    public List<VentaModel> getAllVentass() {
        return jdbcTemplate.query("EXEC SP_VENTAS",
                (rs, rowNum) -> {
                    VentaModel ventaModel = new VentaModel();
                    ventaModel.setIdVenta(rs.getInt(1));
                    ventaModel.setFechaVenta(rs.getTimestamp(2));
                    ventaModel.setDescuento(rs.getDouble(3));
                    ventaModel.setIgv(rs.getDouble(4));
                    ventaModel.setTotal(rs.getDouble(5));
                    ventaModel.setSubtotal(rs.getDouble(6));
                    ventaModel.setTotalDescuento(rs.getDouble(7));
                    ventaModel.setTotalPagar(rs.getDouble(8));
                    ventaModel.setTipoComprobante(rs.getString(9));
                    ventaModel.setEstadoVenta(rs.getString(10));
                    ventaModel.setClientes(rs.getString(11));
                    ventaModel.setIdPedido(rs.getInt(12));
                    ventaModel.setEmpleados(rs.getString(13));
                    ventaModel.setIdMetodoPago(rs.getInt(14));
                    return ventaModel;
                });
    }
}


