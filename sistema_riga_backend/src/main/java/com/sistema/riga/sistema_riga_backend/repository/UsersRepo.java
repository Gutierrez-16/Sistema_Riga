package com.sistema.riga.sistema_riga_backend.repository;


import com.sistema.riga.sistema_riga_backend.entity.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepo extends JpaRepository<OurUsers, Integer> {

    Optional<OurUsers> findByEmail(String email);
}
