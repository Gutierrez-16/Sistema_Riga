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
        System.out.println("Nombre: "+name);
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
        jdbcTemplate.update("EXEC CRUD_Producto @IDProducto = ?, @NombreProducto = ?, @PrecioUnitario = ?, @Imagen = ?, @Descripcion = " +
                                    "?, @EstadoProducto = ?, @IDCategoria = ?, @IDUnidadMedida = ?, @IDLinea = ?, @IDMarca = ?, @Operation = 'U';",
                            productoModel.getIdProducto(),
                            productoModel.getNombreProd(),
                            productoModel.getPrecioUnit(),
                            productoModel.getImagen(),
                            productoModel.getDescripcion(),
                            productoModel.getEstadoProducto(),
                            productoModel.getIdCategoria(),
                            productoModel.getIdUnidadMedida(),
                            productoModel.getIdLinea(),
                            productoModel.getIdMarca());
        return "productoModel";
    }

    @Override
    public String deleteProducto(int idProducto) {
        jdbcTemplate.update("EXEC CRUD_Producto @IDProducto = ?, @Operation = 'D';", idProducto);
        // No necesitas pasar los otros parámetros si solo estás eliminando el producto
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

                      System.out.println("Imagen: "+productoModel.getImagen());
                      return productoModel;
          });
    }
}
