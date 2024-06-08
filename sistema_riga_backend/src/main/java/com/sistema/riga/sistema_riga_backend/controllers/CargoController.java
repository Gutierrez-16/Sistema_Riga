package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.CargoModel;
import com.sistema.riga.sistema_riga_backend.services.ICargoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cargo")
public class CargoController {
    @Autowired
    private ICargoService iCargoService;

    @GetMapping
    public List<CargoModel> getAllCargos() {
        return iCargoService.getAllCargos();
    }

    @GetMapping("/{id}")
    public CargoModel getCargoById(@PathVariable int id) {
        return iCargoService.getCargoById(id);
    }

    @PostMapping
    public String insertCargo(@RequestBody CargoModel cargoModel) {
        return iCargoService.insertCargo(cargoModel);
    }

    @PutMapping("/{id}")
    public String updateCargo(@PathVariable int id, @RequestBody CargoModel cargoModel) {
        cargoModel.setIdCargo(id);
        return iCargoService.updateCargo(cargoModel);
    }

    @DeleteMapping("/{id}")
    public String deleteCargo(@PathVariable int id) {
        return iCargoService.deleteCargo(id);
    }

    @PatchMapping("{id}")
    public String activateCargo(@PathVariable int id){
        return iCargoService.activateCargo(id);
    }
}
