package com.projects.LunarV3.domain.model.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;

@MappedSuperclass
@JsonIgnoreProperties(
        value = {"createdBy", "updatedBy"},
        allowGetters = true
)
@Data
public class UserDateAudit extends DateAudit {
    @CreatedBy
    private Long createdBy;

    @LastModifiedBy
    private Long updatedBy;
}
