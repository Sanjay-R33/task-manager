package com.taskManager.repository;

import com.taskManager.entity.Task;
import com.taskManager.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findByStatus(Status status, Pageable pageable);

    Page<Task> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    Page<Task> findByStatusAndTitleContainingIgnoreCase(
            Status status,
            String title,
            Pageable pageable
    );
}