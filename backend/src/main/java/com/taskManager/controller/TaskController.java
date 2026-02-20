package com.taskManager.controller;

import com.taskManager.entity.Task;
import com.taskManager.enums.Status;
import com.taskManager.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private final TaskService service;

    // CREATE TASK
    @PostMapping("/addtask")
    public Task create(@RequestBody Task task) {
        return service.create(task);
    }

    // GET TODO TASKS
    @GetMapping("/todo")
    public Page<Task> getTodoTasks(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(required = false) String search
    ) {
        return service.getByStatus(Status.TODO, page - 1, search);
    }

    // GET IN_PROGRESS TASKS
    @GetMapping("/progress")
    public Page<Task> getProgressTasks(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(required = false) String search
    ) {
        return service.getByStatus(Status.PROGRESS, page - 1, search);
    }

    // GET DONE TASKS
    @GetMapping("/done")
    public Page<Task> getDoneTasks(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(required = false) String search
    ) {
        return service.getByStatus(Status.DONE, page - 1, search);
    }

    // UPDATE TASK (title / description / status)
    @PutMapping("/edittask/{id}")
    public Task updateTask(
            @PathVariable Long id,
            @RequestBody Task updated
    ) {
        return service.update(id, updated);
    }

    // DELETE TASK
    @DeleteMapping("/deletetask/{id}")
    public void deleteTask(@PathVariable Long id) {
        service.delete(id);
    }
}