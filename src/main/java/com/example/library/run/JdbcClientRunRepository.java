package com.example.library.run;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;


//Runrep is for our run functions and parts in our code and project we use all runs here.
@Repository
public class JdbcClientRunRepository {

    private static final Logger log = LoggerFactory.getLogger(JdbcClientRunRepository.class);
    private final JdbcClient jdbcClient;

    public JdbcClientRunRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Run> findAll() {
        return jdbcClient.sql("select * from run")
                .query(Run.class)
                .list();
    }


//    private List<Run> runs =new ArrayList<>();

//    List<Run> findAll(){
//        return runs;
//    }
//    //if value present we will return true
//    Optional<Run> findById(Integer id){
//        return runs.stream()
//                .filter(run -> run.id() == id)
//                .findFirst();
//    }
//
//    void create(Run run){
//        runs.add(run);
//    }
//
//    void update(Run run, Integer id){
//        Optional<Run> existing = findById(id);
//        if(existing.isPresent()){
//            runs.set(runs.indexOf(existing.get()), run);
//        }
//    }
//    void delete(Integer id){
//        runs.removeIf(run -> run.id().equals(id));
//    }
//
//    @PostConstruct
//    private void init() {
//         runs.add(new Run(1,
//                 "Witcher",
//                 250,
//                 "Wars",
//                 LocalDateTime.now(),
//                 LocalDateTime.now().plus(30, ChronoUnit.MINUTES)));
//
//         runs.add(new Run(2,
//                 "Witcher 2",
//                 275,
//                 "Warsa",
//                 LocalDateTime.now(),
//                 LocalDateTime.now().plus(40, ChronoUnit.MINUTES)));
//     }
    public Optional<Run> findById(Integer id) {
        return jdbcClient.sql("SELECT id,book,pages,author,started_on,completed_on FROM Run WHERE id = :id" )
                .param("id", id)
                .query(Run.class)
                .optional();
    }

    public void create(Run run) {
        var updated = jdbcClient.sql("INSERT INTO Run(id,book,pages,author,started_on,completed_on) values(?,?,?,?,?,?)")
                .params(List.of(run.id(),run.book(),run.pages(), run.author(),run.startedOn(),run.completedOn()))
                .update();

        Assert.state(updated == 1, "Failed to create run " + run.book());
    }

    public void update(Run run, Integer id) {
        var updated = jdbcClient.sql("update run set book = ?, pages = ?, author = ?, started_on = ?, completed_on = ? where id = ?")
                .params(List.of(run.book(),run.pages(), run.author(),run.startedOn(),run.completedOn(), id))
                .update();

        Assert.state(updated == 1, "Failed to update run " + run.book());
    }

    public void delete(Integer id) {
        var updated = jdbcClient.sql("delete from run where id = :id")
                .param("id", id)
                .update();

        Assert.state(updated == 1, "Failed to delete run " + id);
    }

    public int count() {
        return jdbcClient.sql("select * from run").query().listOfRows().size();
    }

    public void saveAll(List<Run> runs) { //that can take a list of runs and insert
        runs.stream().forEach(this::create);
    }

//    public List<Run> findByLocation(String location) {
//        return jdbcClient.sql("select * from run where location = :location")
//                .param("location", location)
//                .query(Run.class)
//                .list();
//    }

}