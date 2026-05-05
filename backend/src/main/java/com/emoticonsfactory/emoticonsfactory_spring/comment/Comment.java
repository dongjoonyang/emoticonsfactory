package com.emoticonsfactory.emoticonsfactory_spring.comment;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10, nullable = false)
    private String author;

    @Column(nullable = false)
    private String password;

    @Column(length = 100, nullable = false)
    private String content;

    private LocalDate createdAt;

    public Comment(String author, String password, String content) {
        this.author = author;
        this.password = password;
        this.content = content;
        this.createdAt = LocalDate.now();
    }

    public void updateContent(String content) {
        this.content = content;
    }
}
