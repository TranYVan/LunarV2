package com.projects.LunarV3.domain.model.audit;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.Instant;

@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@JsonIgnoreProperties(
        value = {"createdAt", "updatedAt"},
        allowGetters = true
)
@Data
public abstract class DateAudit implements Serializable {
    @CreatedDate
    private Instant createAt;

    @LastModifiedDate
    private Instant updatedAt;


}
