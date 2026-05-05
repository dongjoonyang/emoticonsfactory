package com.emoticonsfactory.emoticonsfactory_spring.comment;

import com.emoticonsfactory.emoticonsfactory_spring.comment.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping
    public List<CommentResponse> getAll() {
        return commentService.getAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponse create(@RequestBody CommentRequest request) {
        return commentService.create(request);
    }

    @PutMapping("/{id}")
    public CommentResponse edit(@PathVariable Long id, @RequestBody CommentEditRequest request) {
        return commentService.edit(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id, @RequestBody CommentDeleteRequest request) {
        commentService.delete(id, request);
    }
}
