package com.taskManager.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Status {
    TODO,
    PROGRESS,
    DONE;

    @JsonCreator
    public static Status from(String value) {
        return Status.valueOf(value.toUpperCase());
    }
}


