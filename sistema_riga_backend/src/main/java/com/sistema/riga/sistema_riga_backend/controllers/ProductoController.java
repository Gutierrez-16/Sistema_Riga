package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.ProductoModel;
import com.sistema.riga.sistema_riga_backend.services.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {
    @Autowired
    private IProductoService iProductoService;

    @GetMapping
    public List<ProductoModel> getAllProductos() {
        return iProductoService.getAllProductos();
    }

    @GetMapping("/{id}")
    public ProductoModel getProductoById(@PathVariable int id) {
        return iProductoService.getProductoById(id);
    }

    @PostMapping
    public String insertProducto(@RequestBody ProductoModel productoModel) {
        return iProductoService.insertProducto(productoModel);
    }

    @PutMapping("/{id}")
    public String updateProducto(@PathVariable int id, @RequestBody ProductoModel productoModel) {
        productoModel.setIdProducto(id);
        return iProductoService.updateProducto(productoModel);
    }

    @DeleteMapping("/{id}")
    public String deleteProducto(@PathVariable int id) {
        return iProductoService.deleteProducto(id);
    }
}
