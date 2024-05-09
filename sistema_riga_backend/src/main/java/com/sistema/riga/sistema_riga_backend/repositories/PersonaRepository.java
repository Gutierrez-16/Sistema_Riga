package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.PersonaModel;
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
        jdbcTemplate.update("EXEC CRUD_Producto @IDPersona = ?, @Operation = 'D';", idPersona);
        // No necesitas pasar los otros parámetros si solo estás eliminando el producto
        return "personaModel";
    }

    @Override
    public PersonaModel getPersonaById(int id) {
        return jdbcTemplate.queryForObject("SELECT * FROM Persona WHERE IDPersona = ?",
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

}
