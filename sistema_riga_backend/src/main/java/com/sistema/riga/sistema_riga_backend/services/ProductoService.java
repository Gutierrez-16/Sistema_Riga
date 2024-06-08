package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.ProductoModel;
import com.sistema.riga.sistema_riga_backend.repositories.IProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Service
public class ProductoService implements IProductoService {
    @Autowired
    private IProductoRepository iProductoRepository;

    @Override
    public List<ProductoModel> getAllProductos() {
        return iProductoRepository.getAllProductos();
    }

    @Override
    public ProductoModel getProductoById(int id) {
        return iProductoRepository.getProductoById(id);
    }

    @Override
    public String insertProducto(ProductoModel productoModel) {
        return iProductoRepository.insertProducto(productoModel);
    }

    @Override
    public String updateProducto(ProductoModel productoModel) {
        return iProductoRepository.updateProducto(productoModel);
    }

    @Override
    public String deleteProducto(int id) {
        return iProductoRepository.deleteProducto(id);
    }

    @Override
    public String activateProducto(int id) {
        return iProductoRepository.activateProducto(id);
    }
}
