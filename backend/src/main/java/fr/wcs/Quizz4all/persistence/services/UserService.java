package fr.wcs.Quizz4all.persistence.services;

import fr.wcs.Quizz4all.dto.RoleDTO;
import fr.wcs.Quizz4all.dto.UserDTO;
import fr.wcs.Quizz4all.persistence.entities.Role;
import fr.wcs.Quizz4all.persistence.entities.User;
import fr.wcs.Quizz4all.persistence.repositories.RoleRepository;
import fr.wcs.Quizz4all.persistence.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;


    public List<UserDTO> getAllUsers() {
        List<User> userList = userRepository.findAll();
        return userList.stream().map(user -> convertToDto(user)).collect(Collectors.toList());
    }
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id " + id));
        return convertToDto(user);
    }

    public UserDTO createUser(UserDTO userDto) {
        User user = convertToEntity(userDto);
        Role role = roleRepository.findById(userDto.getRole().getId()).orElseThrow(() -> new RuntimeException("Role not found with id " + userDto.getRole().getId()));
        user.setRole(role);
        User newUser = userRepository.save(user);
        return convertToDto(newUser);
    }

    public UserDTO updateUser(Long id, UserDTO userDto) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id " + id));
        User updatedUser = convertToEntity(userDto);
        updatedUser.setId(existingUser.getId());
        updatedUser.setRole(existingUser.getRole());
        User newUser = userRepository.save(updatedUser);
        return convertToDto(newUser);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id " + id));
        userRepository.delete(user);
    }

    private UserDTO convertToDto(User user) {
        UserDTO userDto = new UserDTO();
        userDto.setId(user.getId());
        userDto.setFirstname(user.getFirstname());
        userDto.setLastname(user.getLastname());
        userDto.setBirthdate(user.getBirthdate());
        userDto.setEmail(user.getEmail());
        userDto.setAvatar(user.getAvatar());
        userDto.setScore(user.getScore());
        userDto.setRole(convertToDto(user.getRole()));
        return userDto;
    }

    private User convertToEntity(UserDTO userDto) {
        User user = new User();
        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        user.setBirthdate(userDto.getBirthdate());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setAvatar(userDto.getAvatar());
        user.setScore(userDto.getScore());
        return user;
    }

    private RoleDTO convertToDto(Role role) {
        RoleDTO roleDto = new RoleDTO();
        roleDto.setId(role.getId());
        roleDto.setRole(role.getRole());
        return roleDto;
    }
}
