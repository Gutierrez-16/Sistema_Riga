package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.ProductoModel;

import java.util.List;

public interface IProductoRepository {
    List<ProductoModel> getAllProductos();
    ProductoModel getProductoById(int id);
    String insertProducto(ProductoModel productoModel);
    String updateProducto(ProductoModel productoModel);
    String deleteProducto(int id);
}
