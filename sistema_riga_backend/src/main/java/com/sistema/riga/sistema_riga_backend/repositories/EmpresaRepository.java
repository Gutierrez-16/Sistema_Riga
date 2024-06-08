package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.EmpresaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EmpresaRepository implements IEmpresaRepositry{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String insertEmpresa(EmpresaModel empresaModel) {
        if (empresaModel.getRuc().length() > 11) {
            throw new IllegalArgumentException("RUC cannot exceed 11 characters");
        }
        empresaModel.setRuc(empresaModel.getRuc().substring(0, 11));
        jdbcTemplate.update("EXEC SP_CRUD_Empresa @RUC = ?, @RazonSocial = ?," +
                        " @Direccion = ?, @IDDistrito = ?, @Operation = 'C'",
                empresaModel.getRuc(),
                empresaModel.getRazonSocial(),
                empresaModel.getDireccion(),
                empresaModel.getIdDistrito());
        return "empresaModel";
    }



    @Override
    public String updateEmpresa(EmpresaModel empresaModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Empresa @IDEmpresa = ?, @RUC = ?, @RazonSocial = ?, " +
                        "@Direccion = ?, @EstadoEmpresa = ?, @IDDistrito = ?, @Operation = 'U'",
                empresaModel.getIdEmpresa(),
                empresaModel.getRuc(),
                empresaModel.getRazonSocial(),
                empresaModel.getDireccion(),
                empresaModel.getEstadoEmpresa(),
                empresaModel.getIdDistrito());
        return "empresaModel";
    }

    @Override
    public String deleteEmpresa(int idEmpresa) {
        jdbcTemplate.update("EXEC SP_CRUD_Empresa @IDEmpresa = ?, @Operation = 'D';", idEmpresa);
        return "empresaModel";
    }

    @Override
    public EmpresaModel getEmpresaById(int id) {
        return jdbcTemplate.queryForObject("EXEC SP_CRUD_Empresa @IDEmpresa = ?, @Operation = 'R'",
                new Object[]{id},
                (rs, rowNum) -> {
                    EmpresaModel empresaModel = new EmpresaModel();
                    empresaModel.setIdEmpresa(rs.getInt("IDEmpresa"));
                    empresaModel.setRuc(rs.getString("RUC"));
                    empresaModel.setRazonSocial(rs.getString("RazonSocial"));
                    empresaModel.setDireccion(rs.getString("Direccion"));
                    empresaModel.setEstadoEmpresa(rs.getString("EstadoEmpresa"));
                    empresaModel.setIdDistrito(rs.getInt("IDDistrito"));
                    return empresaModel;
                });
    }

    @Override
    public List<EmpresaModel> getAllEmpresas() {
        return jdbcTemplate.query("EXEC SP_CRUD_Empresa @Operation = 'R'",
                (rs, rowNum) -> {
                    EmpresaModel empresaModel = new EmpresaModel();
                    empresaModel.setIdEmpresa(rs.getInt("IDEmpresa"));
                    empresaModel.setRuc(rs.getString("RUC"));
                    empresaModel.setRazonSocial(rs.getString("RazonSocial"));
                    empresaModel.setDireccion(rs.getString("Direccion"));
                    empresaModel.setEstadoEmpresa(rs.getString("EstadoEmpresa"));
                    empresaModel.setIdDistrito(rs.getInt("IDDistrito"));
                    return empresaModel;
                });
    }

    @Override
    public String activateEmpresa(int id) {
        jdbcTemplate.update("UPDATE Empresa SET estadoEmpresa = '1' WHERE idEmpresa = ?;", id);
        return "empresaModel";
    }

}
