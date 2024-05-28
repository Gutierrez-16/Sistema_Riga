package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.DepartamentoModel;
import com.sistema.riga.sistema_riga_backend.models.DistritoModel;
import com.sistema.riga.sistema_riga_backend.models.PersonaModel;
import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PersonaRepository implements IPersonaRepositry{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String insertPersona(PersonaModel personaModel) {
        jdbcTemplate.update("EXEC SP_CRUD_Persona  @DNI = ?, @Nombre = ?, @Ape_Pat = ?," +
                        " @Ape_Mat = ?, @Genero = ?, @Fecha_Nac = ?, @Correo = ?, @Celular = ?, @Direccion = ?, " +
                        "@IDDistrito = ?, @Operation = 'C'",
                personaModel.getDni(),
                personaModel.getNombrePersona(),
                personaModel.getApePaterno(),
                personaModel.getApeMaterno(),
                personaModel.getGenero(),
                personaModel.getFechaNac(),
                personaModel.getCorreo(),
                personaModel.getCelular(),
                personaModel.getDireccion(),
                personaModel.getIdDistrito());
        return "personaModel";
    }


    @Override
    public String updatePersona(PersonaModel personaModel) {
        jdbcTemplate.update("EXEC [dbo].[SP_CRUD_Persona] @IDPersona = ?, @DNI = ?, @Nombre = ?, " +
                        "@Ape_Pat = ?, @Ape_Mat = ?, @Genero = ?, @Fecha_Nac = ?, @Correo = ?, @Celular = ?" +
                        ", @Direccion = ?, @EstadoPersona = ?, @IDDistrito = ?, @Operation = 'U';",
                personaModel.getIdPersona(),
                personaModel.getDni(),
                personaModel.getNombrePersona(),
                personaModel.getApePaterno(),
                personaModel.getApeMaterno(),
                personaModel.getGenero(),
                personaModel.getFechaNac(),
                personaModel.getCorreo(),
                personaModel.getCelular(),
                personaModel.getDireccion(),
                personaModel.getEstadoPersona(),
                personaModel.getIdDistrito());
        return "personaModel";
    }

    @Override
    public String deletePersona(int idPersona) {
        jdbcTemplate.update("EXEC SP_CRUD_Persona @IDPersona = ?, @Operation = 'D';", idPersona);
        return "personaModel";
    }

    @Override
    public PersonaModel getPersonaById(int id) {
        return jdbcTemplate.queryForObject("EXEC SP_CRUD_Persona @IDPersona = ?, @Operation = 'R'",
                new Object[]{id},
                (rs, rowNum) -> {
                    PersonaModel personaModel = new PersonaModel();
                    personaModel.setIdPersona(rs.getInt("IDPersona"));
                    personaModel.setDni(rs.getString("DNI"));
                    personaModel.setNombrePersona(rs.getString("Nombre"));
                    personaModel.setApePaterno(rs.getString("Ape_Pat"));
                    personaModel.setApeMaterno(rs.getString("Ape_Mat"));
                    personaModel.setGenero(rs.getString("Genero"));
                    personaModel.setFechaNac(rs.getDate("Fecha_Nac"));
                    personaModel.setCorreo(rs.getString("Correo"));
                    personaModel.setCelular(rs.getString("Celular"));
                    personaModel.setDireccion(rs.getString("Direccion"));
                    personaModel.setEstadoPersona(rs.getString("EstadoPersona"));
                    personaModel.setIdDistrito(rs.getInt("IDDistrito"));
                    return personaModel;
                });
    }

    @Override
    public List<PersonaModel> getAllPersonas() {
        return jdbcTemplate.query("SELECT * FROM Persona",
                (rs, rowNum) -> {
                    PersonaModel personaModel = new PersonaModel();
                    personaModel.setIdPersona(rs.getInt("IDPersona"));
                    personaModel.setDni(rs.getString("DNI"));
                    personaModel.setNombrePersona(rs.getString("Nombre"));
                    personaModel.setApePaterno(rs.getString("Ape_Pat"));
                    personaModel.setApeMaterno(rs.getString("Ape_Mat"));
                    personaModel.setGenero(rs.getString("Genero"));
                    personaModel.setFechaNac(rs.getDate("Fecha_Nac"));
                    personaModel.setCorreo(rs.getString("Correo"));
                    personaModel.setCelular(rs.getString("Celular"));
                    personaModel.setDireccion(rs.getString("Direccion"));
                    personaModel.setEstadoPersona(rs.getString("EstadoPersona"));
                    personaModel.setIdDistrito(rs.getInt("IDDistrito"));
                    return personaModel;
                });
    }
    @Override
    public List<DepartamentoModel> getAllDepartamentos() {
        return jdbcTemplate.query("SELECT * FROM Departamento",
                (rs, rowNum) -> {
                    DepartamentoModel departamentoModel = new DepartamentoModel();
                    departamentoModel.setIdDepartamento(rs.getInt("IDDepartamento"));
                    departamentoModel.setNombreDepartamento(rs.getString("NombreDep"));
                    return departamentoModel;
                });
    }
    @Override
    public List<ProvinciaModel> getProvinciasByDepartamento(int idDepartamento) {
        return jdbcTemplate.query("SELECT * FROM Provincia WHERE IDDepartamento = ?",
                new Object[]{idDepartamento},
                (rs, rowNum) -> {
                    ProvinciaModel provinciaModel = new ProvinciaModel();
                    provinciaModel.setIdProvincia(rs.getInt("IDProvincia"));
                    provinciaModel.setNombreProvincia(rs.getString("NombreProv"));
                    return provinciaModel;
                });
    }
    @Override
    public List<DistritoModel> getDistritosByProvincia(int idProvincia) {
        return jdbcTemplate.query("SELECT * FROM Distrito WHERE IDProvincia = ?",
                new Object[]{idProvincia},
                (rs, rowNum) -> {
                    DistritoModel distritoModel = new DistritoModel();
                    distritoModel.setIdDistrito(rs.getInt("IDDistrito"));
                    distritoModel.setNombreDistrito(rs.getString("NombreDist"));
                    return distritoModel;
                });
    }

    @Override
    public List<ProvinciaModel> getProvinciasByDistrito(int idDistrito) {
        return jdbcTemplate.query("SELECT p.NombreProv, p.IDProvincia " +
                        "FROM Provincia p " +
                        "INNER JOIN Distrito d ON p.IDProvincia = d.IDProvincia " +
                        "WHERE d.IDDistrito = ?;",
                new Object[]{idDistrito},
                (rs, rowNum) -> {
                    ProvinciaModel provinciaModel = new ProvinciaModel();
                    provinciaModel.setNombreProvincia(rs.getString("NombreProv"));
                    provinciaModel.setIdProvincia(rs.getInt("IDProvincia"));
                    return provinciaModel;
                });
    }


    @Override
    public List<DepartamentoModel> getDepartamentosByProvincia(String provincia) {
        return jdbcTemplate.query("SELECT d.NombreDep, d.IDDepartamento " +
                        "FROM Departamento d " +
                        "INNER JOIN Provincia p ON d.IDDepartamento = p.IDDepartamento " +
                        "WHERE p.NombreProv = ?;",
                new Object[]{provincia},
                (rs, rowNum) -> {
                    DepartamentoModel departamentoModel = new DepartamentoModel();
                    departamentoModel.setNombreDepartamento(rs.getString("NombreDep"));
                    departamentoModel.setIdDepartamento(rs.getInt("IDDepartamento"));
                    return departamentoModel;
                });
    }

    @Override
    public String activatePersona(int id) {
        jdbcTemplate.update("UPDATE Persona SET estadoPersona = '1' WHERE idPersona = ?;", id);
        return "personaModel";
    }


}
