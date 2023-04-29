package fr.wcs.Quizz4all.persistence.services;

import fr.wcs.Quizz4all.dto.RoleDTO;
import fr.wcs.Quizz4all.persistence.entities.Role;
import fr.wcs.Quizz4all.persistence.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<RoleDTO> getAllRoles() {
        List<Role> roleList = roleRepository.findAll();
        return roleList.stream().map(role -> convertToDto(role)).collect(Collectors.toList());
    }

    public RoleDTO getRoleById(Long id) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new RuntimeException("Role not found with id " + id));
        return convertToDto(role);
    }

    private RoleDTO convertToDto(Role role) {
        RoleDTO roleDto = new RoleDTO();
        roleDto.setId(role.getId());
        roleDto.setRole(role.getRole());
        return roleDto;
    }
}

