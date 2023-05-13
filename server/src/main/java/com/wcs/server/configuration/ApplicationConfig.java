package com.wcs.server.configuration;

import com.wcs.server.dto.RoleDTO;
import com.wcs.server.entity.Role;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.createTypeMap(RoleDTO.class, Role.class);

        return modelMapper;
    }
}
