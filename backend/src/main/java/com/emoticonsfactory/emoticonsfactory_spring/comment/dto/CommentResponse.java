package com.emoticonsfactory.emoticonsfactory_spring.comment.dto;

import com.emoticonsfactory.emoticonsfactory_spring.comment.Comment;

public record CommentResponse(Long id, String author, String content, String date) {

    public static CommentResponse from(Comment comment) {
        return new CommentResponse(
                comment.getId(),
                comment.getAuthor(),
                comment.getContent(),
                comment.getCreatedAt().toString()
        );
    }
}
