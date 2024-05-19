package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.CargoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CargoRepository implements ICargoRepositry{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String insertCargo(CargoModel cargoModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Cargo @NombreCargo = ?,  @Operation = 'C'",
                cargoModel.getNombreCargo());
        return "cargoModel";
    }


    @Override
    public String updateCargo(CargoModel cargoModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Cargo @IDCargo = ?, @NombreCargo = ?, " +
                        "@EstadoCargo = ?, @Operation = 'U'",
                cargoModel.getIdCargo(),
                cargoModel.getNombreCargo(),
                cargoModel.getEstadoCargo());
        return "cargoModel";
    }

    @Override
    public String deleteCargo(int idCargo) {
        jdbcTemplate.update("EXEC SP_CRUD_Cargo @IDCargo = ?, @Operation = 'D';", idCargo);
        return "idCargo";
    }

    @Override
    public CargoModel getCargoById(int id) {
        return jdbcTemplate.queryForObject("EXEC SP_CRUD_Cargo @IDCargo = ?,@Operation = 'R'",
                new Object[]{id},
                (rs, rowNum) -> {
                    CargoModel cargoModel = new CargoModel();
                    cargoModel.setIdCargo(rs.getInt(1));
                    cargoModel.setNombreCargo(rs.getString(2));
                    cargoModel.setEstadoCargo(rs.getString(3));
                    return cargoModel;
                });
    }

    @Override
    public List<CargoModel> getAllCargos() {
        return jdbcTemplate.query("EXEC SP_CRUD_Cargo @Operation = 'R'",
                (rs, rowNum) -> {
                    CargoModel cargoModel = new CargoModel();
                    cargoModel.setIdCargo(rs.getInt(1));
                    cargoModel.setNombreCargo(rs.getString(2));
                    cargoModel.setEstadoCargo(rs.getString(3));
                    return cargoModel;
                });
    }
}
