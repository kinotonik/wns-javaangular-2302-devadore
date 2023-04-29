package fr.wcs.Quizz4all.persistence.repositories;

import fr.wcs.Quizz4all.persistence.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
