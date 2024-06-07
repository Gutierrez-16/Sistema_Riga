package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.MarcaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MarcaRepository implements IMarcaRepositry{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String insertMarca(MarcaModel marcaModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Marca @NombreMarca = ?,  @Operation = 'C'",
                marcaModel.getNombreMarca());
        return "marcaModel";
    }


    @Override
    public String updateMarca(MarcaModel marcaModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Marca @IDMarca = ?, @NombreMarca = ?, " +
                        "@EstadoMarca = ?, @Operation = 'U'",
                marcaModel.getIdMarca(),
                marcaModel.getNombreMarca(),
                marcaModel.getEstadoMarca());
        return "marcaModel";
    }

    @Override
    public String deleteMarca(int idMarca) {
        jdbcTemplate.update("EXEC SP_CRUD_Marca @IDMarca = ?, @Operation = 'D';", idMarca);
        return "marcaModel";
    }

    @Override
    public MarcaModel getMarcaById(int id) {
        return jdbcTemplate.queryForObject("EXEC SP_CRUD_Marca @IDMarca = ?,@Operation = 'R'",
                new Object[]{id},
                (rs, rowNum) -> {
                    MarcaModel marcaModel = new MarcaModel();
                    marcaModel.setIdMarca(rs.getInt(1));
                    marcaModel.setNombreMarca(rs.getString(2));
                    marcaModel.setEstadoMarca(rs.getString(3));
                    return marcaModel;
                });
    }

    @Override
    public List<MarcaModel> getAllMarcas() {
        return jdbcTemplate.query("EXEC SP_CRUD_Marca @Operation = 'R'",
                (rs, rowNum) -> {
                    MarcaModel marcaModel = new MarcaModel();
                    marcaModel.setIdMarca(rs.getInt(1));
                    marcaModel.setNombreMarca(rs.getString(2));
                    marcaModel.setEstadoMarca(rs.getString(3));
                    return marcaModel;
                });
    }

    @Override
    public String activateMarca(int id) {
        jdbcTemplate.update("UPDATE Marca SET EstadoMarca = '1' WHERE IDMarca = ?;", id);
        return "marcaModel";
    }
}
