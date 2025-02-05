package com.wcs.server.DataTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import com.wcs.server.configuration.ApplicationTestConfig;
import com.wcs.server.entity.Role;
import com.wcs.server.repository.RoleRepository;

@DataJpaTest
@Import(ApplicationTestConfig.class)
public class RoleEntityTest {

    @Autowired
    RoleRepository RoleRepository;

    @Test
    public void testCreateRole() {
        String name = "ROLE_ADMIN";
        var role = new Role(name);

        RoleRepository.saveAndFlush(role);

        Optional<Role> fromDB = RoleRepository.findById(role.getId());

        assertTrue(fromDB.isPresent());
        assertEquals(role.getId(), fromDB.get().getId());
        assertEquals(role.getName(), fromDB.get().getName()); 
    }

    @Test
    public void testGetName() {
        String name = "ROLE_ADMIN";
        var role = new Role(name);

        assertEquals(role.getName(), name);
    }

    @Test
    public void testSetName() {
        String name = "ROLE_ADMIN";
        var role = new Role(name);

        String newName = "ROLE_USER";
        role.setName(newName);

        assertEquals(role.getName(), newName);
    }

    @Test
    public void testGetId() {
        String name = "ROLE_ADMIN";
        var role = new Role(name);

        assertEquals(role.getId(), null);
    }

    @Test
    public void testSetId() {
        String name = "ROLE_ADMIN";
        var role = new Role(name);

       Long id = (long) 1;
        role.setId(id);

        assertEquals(role.getId(), id);
    }


}
