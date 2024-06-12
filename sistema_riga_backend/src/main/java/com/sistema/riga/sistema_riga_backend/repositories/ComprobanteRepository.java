package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.ComprobanteModel;
import com.sistema.riga.sistema_riga_backend.models.DetallePedidosModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;


@Repository
public class ComprobanteRepository implements IComprobanteRepositry {
    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Override
    public List<ComprobanteModel> getComprobanteById(int id) {
        return jdbcTemplate.query(
                "EXEC [SP_Comprobante] @IDVenta = ? ",
                new Object[]{id},
                (rs, rowNum) -> {
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
                }
        );
    }


}
