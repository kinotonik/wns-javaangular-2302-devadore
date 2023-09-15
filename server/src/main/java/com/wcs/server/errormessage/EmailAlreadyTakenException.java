package com.wcs.server.errormessage;

public class EmailAlreadyTakenException extends RuntimeException {

    public EmailAlreadyTakenException(String message) {
        super(message);
    }

    // Si nécessaire pour les mails, je peux ajouter des constructeurs supplémentaires, des méthodes, etc.
}
