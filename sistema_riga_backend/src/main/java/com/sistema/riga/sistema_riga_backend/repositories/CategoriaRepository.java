package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.CategoriaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CategoriaRepository implements ICategoriaRepositry{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String insertCategoria(CategoriaModel categoriaModel) {
        jdbcTemplate.update("EXEC [SP_CRUD_Categoria] @NombreCategoria = ?,  @Operation = 'C'",
                categoriaModel.getNombreCategoria());
        return "categoriaModel";
    }


    @Override
    public String updateCategoria(CategoriaModel categoriaModel) {
        jdbcTemplate.update("EXEC [SP_CRUD_Categoria] @IDCategoria = ?, @NombreCategoria = ?, " +
                        "@EstadoCategoria = ?, @Operation = 'U'",
                categoriaModel.getIdCategoria(),
                categoriaModel.getNombreCategoria(),
                categoriaModel.getEstadoCategoria());
        return "categoriaModel";
    }

    @Override
    public String deleteCategoria(int idCategoria) {
        jdbcTemplate.update("EXEC [SP_CRUD_Categoria] @IDCategoria = ?, @Operation = 'D';", idCategoria);
        return "categoriaModel";
    }

    @Override
    public CategoriaModel getCategoriaById(int id) {
        return jdbcTemplate.queryForObject("EXEC [SP_CRUD_Categoria] @IDCategoria = ?,@Operation = 'R'",
                new Object[]{id},
                (rs, rowNum) -> {
                    CategoriaModel categoriaModel = new CategoriaModel();
                    categoriaModel.setIdCategoria(rs.getInt(1));
                    categoriaModel.setNombreCategoria(rs.getString(2));
                    categoriaModel.setEstadoCategoria(rs.getString(3));
                    return categoriaModel;
                });
    }

    @Override
    public List<CategoriaModel> getAllCategorias() {
        return jdbcTemplate.query("SELECT * FROM Categoria;",
                (rs, rowNum) -> {
                    CategoriaModel categoriaModel = new CategoriaModel();
                    categoriaModel.setIdCategoria(rs.getInt(1));
                    categoriaModel.setNombreCategoria(rs.getString(2));
                    categoriaModel.setEstadoCategoria(rs.getString(3));
                    return categoriaModel;
                });
    }

    @Override
    public String activateCategoria(int id) {
        jdbcTemplate.update("UPDATE Categoria SET estadoCategoria= '1' WHERE idCategoria = ?;", id);
        return "categoriaModel";
    }
}
