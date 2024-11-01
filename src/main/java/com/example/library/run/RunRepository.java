package com.example.library.run;

import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface RunRepository extends ListCrudRepository<Run, Integer> {

    List<Run> findAllByBook(String book); //for searching books
}
