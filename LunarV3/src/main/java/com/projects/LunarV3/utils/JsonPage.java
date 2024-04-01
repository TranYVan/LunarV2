package com.projects.LunarV3.utils;

import com.fasterxml.jackson.annotation.JsonView;
import com.projects.LunarV3.domain.Views;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class JsonPage<T> extends PageImpl<T> {
    public JsonPage(final List<T> content, final Pageable pageable, final long total) {
        super(content, pageable, total);
    }

    public JsonPage(final List<T> content) {
        super(content);
    }

    public JsonPage(final Page<T> page, final Pageable pageable) {
        super(page.getContent(), pageable, page.getTotalElements());
    }

    @JsonView(Views.ExternalView.class)
    public int getTotalPages() {
        return super.getTotalPages();
    }

    @JsonView(Views.ExternalView.class)
    public long getTotalElements() {
        return super.getTotalElements();
    }

    @JsonView(Views.ExternalView.class)
    public boolean hasNext() {
        return super.hasNext();
    }

    @JsonView(Views.ExternalView.class)
    public boolean isLast() {
        return super.isLast();
    }

    @JsonView(Views.ExternalView.class)
    public boolean hasContent() {
        return super.hasContent();
    }

    @JsonView(Views.ExternalView.class)
    public List<T> getContent() {
        return super.getContent();
    }

}
