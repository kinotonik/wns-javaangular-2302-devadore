package com.wcs.server.configuration;

import com.wcs.server.dto.RoleDTO;
import com.wcs.server.entity.Role;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {

    /***
     * "bean" est tout simplement un objet dont la création, la configuration et la gestion du cycle de vie sont contrôlées par Spring et s'occupe de les injecter là où ils sont nécessaires.
     * Crée un objet ModelMapper et le configure pour convertir entre deux types de classes spécifiques, RoleDTO et Role.
     * Mapper automatiquement les données entre des objets de types différents
     * @return objet ModelMapper
     */
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.createTypeMap(RoleDTO.class, Role.class);

        return modelMapper;
    }
}
