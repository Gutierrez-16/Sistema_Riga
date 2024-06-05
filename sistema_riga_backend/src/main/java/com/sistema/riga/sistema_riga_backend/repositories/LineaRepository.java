package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.LineaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LineaRepository implements ILineaRepositry{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String insertLinea(LineaModel lineaModel) {
        jdbcTemplate.update("EXEC [SP_CRUD_Linea] @NombreLinea = ?,  @Operation = 'C'",
                lineaModel.getNombreLinea());
        return "lineaModel";
    }


    @Override
    public String updateLinea(LineaModel lineaModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Linea @IDLinea = ?, @NombreLinea = ?, " +
                        "@EstadoLinea = ?, @Operation = 'U'",
                lineaModel.getIdLinea(),
                lineaModel.getNombreLinea(),
                lineaModel.getEstadoLinea());
        return "lineaModel";
    }

    @Override
    public String deleteLinea(int idLinea) {
        jdbcTemplate.update("EXEC SP_CRUD_Linea @IDLinea = ?, @Operation = 'D';", idLinea);
        return "lineaModel";
    }

    @Override
    public LineaModel getLineaById(int id) {
        return jdbcTemplate.queryForObject("EXEC SP_CRUD_Linea @IDLinea = ?,@Operation = 'R'",
                new Object[]{id},
                (rs, rowNum) -> {
                    LineaModel lineaModel = new LineaModel();
                    lineaModel.setIdLinea(rs.getInt(1));
                    lineaModel.setNombreLinea(rs.getString(2));
                    lineaModel.setEstadoLinea(rs.getString(3));
                    return lineaModel;
                });
    }

    @Override
    public List<LineaModel> getAllLineas() {
        return jdbcTemplate.query("EXEC SP_CRUD_Linea @Operation = 'R'",
                (rs, rowNum) -> {
                    LineaModel lineaModel = new LineaModel();
                    lineaModel.setIdLinea(rs.getInt(1));
                    lineaModel.setNombreLinea(rs.getString(2));
                    lineaModel.setEstadoLinea(rs.getString(3));
                    return lineaModel;
                });
    }

    @Override
    public String activateLinea(int id) {
        jdbcTemplate.update("UPDATE Linea SET EstadoEmpleado = '1' WHERE IDLinea = ?;", id);
        return "lineaModel";
    }

}
