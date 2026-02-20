package com.taskManager.controller;


import com.taskManager.entity.Task;
import com.taskManager.enums.Status;
import com.taskManager.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
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
