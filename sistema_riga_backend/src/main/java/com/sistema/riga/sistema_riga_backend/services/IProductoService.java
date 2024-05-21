package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.ProductoModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IProductoService {
    List<ProductoModel> getAllProductos();
    ProductoModel getProductoById(int id);
    String insertProducto(ProductoModel productoModel);
    String updateProducto(ProductoModel productoModel);
    String deleteProducto(int id);
}
