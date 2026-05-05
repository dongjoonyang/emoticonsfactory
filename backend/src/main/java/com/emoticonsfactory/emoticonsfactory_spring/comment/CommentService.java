package com.emoticonsfactory.emoticonsfactory_spring.comment;

import com.emoticonsfactory.emoticonsfactory_spring.comment.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public List<CommentResponse> getAll() {
        return commentRepository.findAll().stream()
                .map(CommentResponse::from)
                .toList();
    }

    public CommentResponse create(CommentRequest request) {
        String hashed = passwordEncoder.encode(request.password());
        Comment comment = new Comment(request.author(), hashed, request.content());
        return CommentResponse.from(commentRepository.save(comment));
    }

    public CommentResponse edit(Long id, CommentEditRequest request) {
        Comment comment = findOrThrow(id);
        verifyPassword(request.password(), comment.getPassword());
        comment.updateContent(request.content());
        return CommentResponse.from(commentRepository.save(comment));
    }

    public void delete(Long id, CommentDeleteRequest request) {
        Comment comment = findOrThrow(id);
        verifyPassword(request.password(), comment.getPassword());
        commentRepository.delete(comment);
    }

    private Comment findOrThrow(Long id) {
        return commentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "댓글을 찾을 수 없습니다."));
    }

    private void verifyPassword(String raw, String hashed) {
        if (!passwordEncoder.matches(raw, hashed)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "비밀번호가 틀렸습니다.");
        }
    }
}
