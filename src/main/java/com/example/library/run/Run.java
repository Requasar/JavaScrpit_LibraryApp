package com.example.library.run;



import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Version;

import java.time.LocalDateTime;

public record Run(
        @Id
        Integer id,
        @NotEmpty
        String book,
        @Positive
        Integer pages,
        String author,
        LocalDateTime startedOn,
        LocalDateTime completedOn,
        @Version
        Integer version // This is for checking the row is new or not
){
    public Run{
        if(!completedOn.isAfter(startedOn)) {
            throw new IllegalArgumentException("completedOn must be after now");
        }
    }
}

