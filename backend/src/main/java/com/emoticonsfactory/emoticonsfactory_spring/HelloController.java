package com.emoticonsfactory.emoticonsfactory_spring;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String hello() {
        return "안녕하세요! 이모티콘 팩토리 서버가 정상 작동 중입니다.";
    }
}