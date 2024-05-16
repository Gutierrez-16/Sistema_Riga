package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.ProductoModel;
import com.sistema.riga.sistema_riga_backend.services.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public String insertProducto(@RequestPart("imagen") MultipartFile imagen) {
        System.out.println(imagen);
        try {
            byte[] bytes = imagen.getBytes();
            ProductoModel productoModel = new ProductoModel();
            productoModel.setImagen(bytes);
            iProductoService.insertProducto(productoModel);
            return "procesado";
        } catch (IOException e) {
            System.out.println("error: " + e.toString());
            e.printStackTrace();
            return "error";
        }
    }

    @PostMapping("/prueba")
    public String insertProducto1(
            @RequestParam("nombre") String nombre,
            @RequestParam("precio") double precio,
            @RequestPart("imagen") MultipartFile image,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("categoria") int categoria,
            @RequestParam("unidad") int unidad,
            @RequestParam("linea") int linea,
            @RequestParam("marca") int marca){

        try {
            byte[] bytes = image.getBytes();
            ProductoModel productoModel = new ProductoModel();

            productoModel.setNombreProd(nombre);
            productoModel.setPrecioUnit(precio);
            productoModel.setImagen(bytes);
            productoModel.setDescripcion(descripcion);
            productoModel.setIdCategoria(categoria);
            productoModel.setIdUnidadMedida(unidad);
            productoModel.setIdLinea(linea);
            productoModel.setIdMarca(marca);

            iProductoService.insertProducto(productoModel);
            return "procesado";
        } catch (IOException e) {
            System.out.println("error: " + e.toString());
            e.printStackTrace();
            return "error";
        }
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
