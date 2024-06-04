package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.CajaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CajaRepository implements ICajaRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String insertCaja(CajaModel cajaModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Caja @Descripcion = ?, @FechaApertura = ?, @FechaCierre = ?, @MontoInicial = ?, @MontoFinal = ?, @EstadoCaja = ?, @IDUsuario = ?, @Operation = 'C'",
                cajaModel.getDescripcion(),
                cajaModel.getFechaApertura(),
                cajaModel.getFechaCierre(),
                cajaModel.getMontoInicial(),
                cajaModel.getMontoFinal(),
                cajaModel.getEstadoCaja(),
                cajaModel.getIdUsuario());
        return "Caja creada exitosamente";
    }

    @Override
    public String updateCaja(CajaModel cajaModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Caja @IDCaja = ?, @Descripcion = ?, @FechaApertura = ?, @FechaCierre = ?, @MontoInicial = ?, @MontoFinal = ?, @EstadoCaja = ?, @IDUsuario = ?, @Operation = 'U'",
                cajaModel.getIdCaja(),
                cajaModel.getDescripcion(),
                cajaModel.getFechaApertura(),
                cajaModel.getFechaCierre(),
                cajaModel.getMontoInicial(),
                cajaModel.getMontoFinal(),
                cajaModel.getEstadoCaja(),
                cajaModel.getIdUsuario());
        return "Caja actualizada exitosamente";
    }

    @Override
    public String deleteCaja(int idCaja) {
        jdbcTemplate.update("EXEC SP_CRUD_Caja @IDCaja = ?, @Operation = 'D'", idCaja);
        return "Caja eliminada exitosamente";
    }

    @Override
    public CajaModel getCajaById(int id) {
        return jdbcTemplate.queryForObject("EXEC SP_CRUD_Caja @IDCaja = ?, @Operation = 'R'",
                new Object[]{id},
                (rs, rowNum) -> {
                    CajaModel cajaModel = new CajaModel();
                    cajaModel.setIdCaja(rs.getInt("IDCaja"));
                    cajaModel.setDescripcion(rs.getString("Descripcion"));
                    cajaModel.setFechaApertura(rs.getDate("FechaApertura"));
                    cajaModel.setFechaCierre(rs.getDate("FechaCierre"));
                    cajaModel.setMontoInicial(rs.getDouble("MontoInicial"));
                    cajaModel.setMontoFinal(rs.getDouble("MontoFinal"));
                    cajaModel.setEstadoCaja(rs.getString("EstadoCaja").charAt(0));
                    cajaModel.setIdUsuario(rs.getInt("IDUsuario"));
                    return cajaModel;
                });
    }

    @Override
    public List<CajaModel> getAllCajas() {
        return jdbcTemplate.query("EXEC SP_CRUD_Caja @Operation = 'R'",
                (rs, rowNum) -> {
                    CajaModel cajaModel = new CajaModel();
                    cajaModel.setIdCaja(rs.getInt("IDCaja"));
                    cajaModel.setDescripcion(rs.getString("Descripcion"));
                    cajaModel.setFechaApertura(rs.getDate("FechaApertura"));
                    cajaModel.setFechaCierre(rs.getDate("FechaCierre"));
                    cajaModel.setMontoInicial(rs.getDouble("MontoInicial"));
                    cajaModel.setMontoFinal(rs.getDouble("MontoFinal"));
                    cajaModel.setEstadoCaja(rs.getString("EstadoCaja").charAt(0));
                    cajaModel.setIdUsuario(rs.getInt("IDUsuario"));
                    return cajaModel;
                });
    }

    @Override
    public String cerrarCaja(int id) {
        jdbcTemplate.update("EXEC SP_caja @IDCaja = ?", id);
        return "Caja cerrada exitosamente";
    }

    @Override
    public List<CajaModel> searchCajas(String descripcion) {
        return jdbcTemplate.query("EXEC SP_CRUD_Caja @Descripcion = ?, @Operation = 'B'",
                new Object[]{descripcion},
                (rs, rowNum) -> {
                    CajaModel cajaModel = new CajaModel();
                    cajaModel.setIdCaja(rs.getInt("IDCaja"));
                    cajaModel.setDescripcion(rs.getString("Descripcion"));
                    cajaModel.setFechaApertura(rs.getDate("FechaApertura"));
                    cajaModel.setFechaCierre(rs.getDate("FechaCierre"));
                    cajaModel.setMontoInicial(rs.getDouble("MontoInicial"));
                    cajaModel.setMontoFinal(rs.getDouble("MontoFinal"));
                    cajaModel.setEstadoCaja(rs.getString("EstadoCaja").charAt(0));
                    cajaModel.setIdUsuario(rs.getInt("IDUsuario"));
                    return cajaModel;
                });
    }
}
