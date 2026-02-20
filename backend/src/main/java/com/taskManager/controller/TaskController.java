package com.taskManager.TaskManager.controller;


import com.taskManager.TaskManager.entity.Task;
import com.taskManager.TaskManager.enums.Status;
import com.taskManager.TaskManager.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService service;

    @PostMapping
    public Task create(@Valid @RequestBody Task task) {
        return service.create(task);
    }

    @PutMapping("/{id}/status")
    public Task updateStatus(@PathVariable Long id,
                             @RequestParam Status status) {
        return service.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping
    public Page<Task> getAll(Pageable pageable) {
        return service.getAll(pageable);
    }

    @GetMapping("/filter")
    public Page<Task> filterByStatus(@RequestParam Status status,
                                     Pageable pageable) {
        return service.filterByStatus(status, pageable);
    }

    @GetMapping("/search")
    public Page<Task> search(@RequestParam String title,
                             Pageable pageable) {
        return service.searchByTitle(title, pageable);
    }
}
