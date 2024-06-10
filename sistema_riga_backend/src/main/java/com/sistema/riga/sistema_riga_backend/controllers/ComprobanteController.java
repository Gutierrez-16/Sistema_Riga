package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.ComprobanteModel;
import com.sistema.riga.sistema_riga_backend.services.IComprobanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/comprobante")
public class ComprobanteController {

    @Autowired
    private IComprobanteService iComprobanteService;

    @GetMapping("/{id}")
    public List<ComprobanteModel> getComprobanteById(@PathVariable int id) {
        return iComprobanteService.getComprobanteById(id);
    }

}


