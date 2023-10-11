package com.wcs.server.ControllerTest;

import com.wcs.server.controller.UserController;
import com.wcs.server.dto.RoleDTO;
import com.wcs.server.dto.UserDTO;
import com.wcs.server.service.RoleService;
import com.wcs.server.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

class UserControllerTest {

    @Mock
    private UserService userService;
    @Mock
    private RoleService roleService;
    @InjectMocks
    private UserController controller;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllUsers_ReturnsUsers() {
        // Arrange
        UserDTO user1 = new UserDTO();
        user1.setId(1L);
        user1.setUsername("Bernad");

        UserDTO user2 = new UserDTO();
        user2.setId(2L);
        user2.setUsername("Mouloud");

        List<UserDTO> expectedUsers = Arrays.asList(user1, user2);

        Mockito.when(userService.getAllUsers()).thenReturn(expectedUsers);

        // Act
        ResponseEntity<List<UserDTO>> response = controller.getAllUsers();

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(expectedUsers.size(), response.getBody().size());
        assertEquals(expectedUsers, response.getBody());
    }

    @Test
    void testGetUserImage_WithValidId_ReturnsImage() {
        // Arrange
        Long userId = 1L;
        byte[] imageBytes = {1, 2, 3};
        String mimeType = "image/jpeg";

        UserDTO user = new UserDTO();
        user.setId(userId);
        user.setImage(imageBytes);
        user.setMimeType(mimeType);

        Mockito.when(userService.getUserById(userId)).thenReturn(user);

        // Act
        ResponseEntity<byte[]> response = controller.getUserImage(userId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(imageBytes.length, response.getBody().length);

        HttpHeaders headers = response.getHeaders();
        assertNotNull(headers);
        assertEquals(MediaType.parseMediaType(mimeType), headers.getContentType());
        assertEquals(imageBytes.length, headers.getContentLength());
    }

    @Test
    void testGetUserImage_WithInvalidId_ReturnsNotFound() {
        // Arrange
        Long userId = 1L;

        Mockito.when(userService.getUserById(userId)).thenReturn(null);

        // Act
        ResponseEntity<byte[]> response = controller.getUserImage(userId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void testGetAllRoles_ReturnsRoles() {
        // Arrange
        RoleDTO role1 = new RoleDTO();
        role1.setId(1L);
        role1.setName("Role 1");

        RoleDTO role2 = new RoleDTO();
        role2.setId(2L);
        role2.setName("Role 2");

        List<RoleDTO> expectedRoles = Arrays.asList(role1, role2);

        Mockito.when(roleService.getAllRoles()).thenReturn(expectedRoles);


        // Act
        ResponseEntity<List<RoleDTO>> response = controller.getAllRoles();

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(expectedRoles.size(), response.getBody().size());
        assertEquals(expectedRoles, response.getBody());
    }

    @Test
    void testGetRoleById_WithValidId_ReturnsRole() {
        // Arrange
        Long roleId = 1L;
        RoleDTO expectedRole = new RoleDTO();
        expectedRole.setId(roleId);
        expectedRole.setName("Role 1");

        Mockito.when(roleService.getRoleById(roleId)).thenReturn(expectedRole);

        // Act
        RoleDTO role = controller.getRoleById(roleId);

        // Assert
        assertNotNull(role);
        assertEquals(expectedRole, role);
    }

    @Test
    void testGetRoleById_WithInvalidId_ReturnsNull() {
        // Arrange
        Long roleId = 1L;

        Mockito.when(roleService.getRoleById(roleId)).thenReturn(null);

        // Act
        RoleDTO role = controller.getRoleById(roleId);

        // Assert
        assertNull(role);
    }
}


