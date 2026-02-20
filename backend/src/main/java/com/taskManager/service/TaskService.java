package com.taskManager.service;


import com.taskManager.entity.Task;
import com.taskManager.enums.Status;
import com.taskManager.exception.TaskNotFoundException;
import com.taskManager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository repository;

    public Task create(Task task) {
        task.setStatus(Status.TODO);
        task.setCreatedAt(LocalDateTime.now());
        return repository.save(task);
    }

    public Task updateStatus(Long id, Status status) {
        Task task = getTask(id);
        task.setStatus(status);
        return repository.save(task);
    }

    public void delete(Long id) {
        Task task = getTask(id);
        repository.delete(task);
    }

    public Page<Task> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Page<Task> filterByStatus(Status status, Pageable pageable) {
        return repository.findByStatus(status, pageable);
    }

    public Page<Task> searchByTitle(String title, Pageable pageable) {
        return repository.findByTitleContainingIgnoreCase(title, pageable);
    }

    private Task getTask(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }
}
