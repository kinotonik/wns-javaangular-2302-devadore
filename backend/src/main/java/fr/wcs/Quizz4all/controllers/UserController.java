package fr.wcs.Quizz4all.controllers;

import fr.wcs.Quizz4all.dto.RoleDTO;
import fr.wcs.Quizz4all.dto.UserDTO;
import fr.wcs.Quizz4all.persistence.entities.Role;
import fr.wcs.Quizz4all.persistence.entities.User;
import fr.wcs.Quizz4all.persistence.repositories.RoleRepository;
import fr.wcs.Quizz4all.persistence.repositories.UserRepository;

import fr.wcs.Quizz4all.persistence.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
/*
@RestControlle
*//*@CrossOrigin(origins = "http://localhost:4200")*//*
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

   @GetMapping("/users")
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserDTO> userDTOs = new ArrayList<>();

        for (User user : users) {
            String birthdateFormatted = userService.formatDate(user.getBirthdate());
            UserDTO userDTO = new UserDTO(user.getId(), user.getFirstname(), user.getLastname(), user.getEmail(), user.getAvatar(), birthdateFormatted);
            userDTOs.add(userDTO);
        }

        return ResponseEntity.ok(userDTOs);
    }
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {

        return userRepository.save(user);
    }


}*/
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("")
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("")
    public UserDTO createUser(@RequestBody UserDTO userDto) {
        return userService.createUser(userDto);
    }

    @PutMapping("/{id}")
    public UserDTO updateUser(@PathVariable Long id, @RequestBody UserDTO userDto) {
        return userService.updateUser(id, userDto);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}

