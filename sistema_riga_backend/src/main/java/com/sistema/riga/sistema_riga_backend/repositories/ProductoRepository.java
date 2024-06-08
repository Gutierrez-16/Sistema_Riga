package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.ProductoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductoRepository implements IProductoRepository{

    String SQL = "INSERT INTO Producto VALUES ('ProductoNmae',23.56,?,'fgfgf','1',1,1,1,1);";
    String SQL2 = "EXEC CRUD_Producto @NombreProducto = ?, @PrecioUnitario = ?, @Imagen = ?, @Descripcion = ?, @IDCategoria = ?, @IDUnidadMedida = ?, @IDLinea = ?, @IDMarca = ?, @Operation = 'C';";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String insertProducto(ProductoModel productoModel) {
        String name = productoModel.getNombreProd();
        jdbcTemplate.update(
                SQL2,
                    productoModel.getNombreProd(),
                    productoModel.getPrecioUnit(),
                    productoModel.getImagen(),
                    productoModel.getDescripcion(),
                    productoModel.getIdCategoria(),
                    productoModel.getIdUnidadMedida(),
                    productoModel.getIdLinea(),
                    productoModel.getIdMarca());
        return "productoModel";
    }

    @Override
    public String updateProducto(ProductoModel productoModel) {
        jdbcTemplate.update("UPDATE Producto SET  NombreProducto = ?, PrecioUnitario = ?, Imagen = ?, Descripcion = " +
                                    "?, IDCategoria = ?, IDUnidadMedida = ?, IDLinea = ?, IDMarca = ? WHERE IDProducto = ?;",
                            productoModel.getNombreProd(),
                            productoModel.getPrecioUnit(),
                            productoModel.getImagen(),
                            productoModel.getDescripcion(),
                            productoModel.getIdCategoria(),
                            productoModel.getIdUnidadMedida(),
                            productoModel.getIdLinea(),
                            productoModel.getIdMarca(),
                            productoModel.getIdProducto());
        return "productoModel";
    }

    @Override
    public String deleteProducto(int idProducto) {
        jdbcTemplate.update("UPDATE Producto SET estadoProducto = '0' WHERE IDProducto = ?;", idProducto);
        return "productoModel";
    }

    @Override
    public String activateProducto(int id) {
        jdbcTemplate.update("UPDATE Producto SET estadoProducto = '1' WHERE idProducto = ?;", id);
        return "productoModel";
    }

    @Override
    public ProductoModel getProductoById(int id) {
        return jdbcTemplate.queryForObject("EXEC CRUD_Producto @IDProducto = ?, @Operation = 'R';",
               new Object[]{id},
               (rs, rowNum) -> {
                   ProductoModel productoModel = new ProductoModel();
                   productoModel.setIdProducto(rs.getInt("IDProducto"));
                   productoModel.setNombreProd(rs.getString("NombreProducto"));
                   productoModel.setPrecioUnit(rs.getDouble("PrecioUnitario"));
                   productoModel.setImagen(rs.getBytes("Imagen"));
                   productoModel.setDescripcion(rs.getString("Descripcion"));
                   productoModel.setEstadoProducto(rs.getString("EstadoProducto"));
                   productoModel.setIdCategoria(rs.getInt("IDCategoria"));
                   productoModel.setIdUnidadMedida(rs.getInt("IDUnidadMedida"));
                   productoModel.setIdLinea(rs.getInt("IDLinea"));
                   productoModel.setIdMarca(rs.getInt("IDMarca"));
                   return productoModel;
               });
    }

    @Override
    public List<ProductoModel> getAllProductos() {
        return jdbcTemplate.query("SELECT * FROM Producto",
                  (rs, rowNum) -> {
                      ProductoModel productoModel = new ProductoModel();
                      productoModel.setIdProducto(rs.getInt("IDProducto"));
                      productoModel.setNombreProd(rs.getString("NombreProducto"));
                      productoModel.setPrecioUnit(rs.getDouble("PrecioUnitario"));
                      productoModel.setImagen(rs.getBytes("Imagen"));
                      productoModel.setDescripcion(rs.getString("Descripcion"));
                      productoModel.setEstadoProducto(rs.getString("EstadoProducto"));
                      productoModel.setIdCategoria(rs.getInt("IDCategoria"));
                      productoModel.setIdUnidadMedida(rs.getInt("IDUnidadMedida"));
                      productoModel.setIdLinea(rs.getInt("IDLinea"));
                      productoModel.setIdMarca(rs.getInt("IDMarca"));
                      return productoModel;
          });
    }
}
