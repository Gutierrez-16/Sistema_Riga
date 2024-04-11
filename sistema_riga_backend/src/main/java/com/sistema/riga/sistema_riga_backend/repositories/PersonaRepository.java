package com.sistema.riga.sistema_riga_backend.repositories;
import com.sistema.riga.sistema_riga_backend.models.PersonaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class PersonaRepository implements IPersonaRepositry {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public List<PersonaModel> findAll() {
        String SQL = "SELECT * FROM Persona WHERE IDDistrito = 1";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(PersonaModel.class));
    }

    @Override
    public int save(PersonaModel personaModel) {
        String SQL = "INSERT INTO Persona VALUES(?,?,?,?,?,?,?,?,?,?,?)";
        return jdbcTemplate.update(SQL,
                                   new Object[]{personaModel.getDni(), personaModel.getNombrePersona(), personaModel.getApePaterno(), personaModel.getApeMaterno(), personaModel.getGenero(), personaModel.getFechaNac(), personaModel.getCorreo(), personaModel.getCelular(), personaModel.getDireccion(), personaModel.getEstadoCivil(), personaModel.getIdDistrito()});

    }
    @Override
    public int update(PersonaModel personaModel) {
        String SQL = "UPDATE Persona SET dni = ?, nombrePersona = ?, ApePaterno = ?," +
                "ApeMaterno = ?, genero = ?, fechaNac = ?, correo = ?,  " +
                "celular = ?, direccion = ?, estadoCivil = ?, IDDistrito = ?";
        return jdbcTemplate.update(SQL, new Object[]{personaModel.getDni(), personaModel.getNombrePersona(), personaModel.getApePaterno(),
                personaModel.getApeMaterno(), personaModel.getGenero(), personaModel.getFechaNac(), personaModel.getCorreo(), personaModel.getCelular(), personaModel.getDireccion(), personaModel.getEstadoCivil(), personaModel.getIdDistrito()});
    }

    @Override
    public int deleteById(int id) {
        String SQL = "DELETE FROM Persona WHERE IDPersona = ?";
        return jdbcTemplate.update(SQL, new Object[]{id});
    }
}