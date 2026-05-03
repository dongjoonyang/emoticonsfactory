import { useState } from 'react';
import styles from './WhatFriendsSay.module.css';

interface Comment {
  id: number;
  content: string;
  author: string;
  date: string;
}

const INITIAL_COMMENTS: Comment[] = [
  { id: 1, content: '안녕하세요', author: '멍랑이', date: '2026-04-27' },
  { id: 2, content: '반가워요', author: '일촌명', date: '2026-04-28' },
];

export default function WhatFriendsSay() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);

  const handleSubmit = () => {
    if (!name.trim() || !message.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      content: message.slice(0, 25),
      author: name.slice(0, 10),
      date: new Date().toISOString().slice(0, 10),
    };
    setComments((prev) => [...prev, newComment]);
    setName('');
    setPassword('');
    setMessage('');
  };

  const handleDelete = (id: number) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className={styles.section}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>What Friends Say</h2>
        <span className={styles.subtitle}>이야기를 남겨보세요.</span>
      </div>

      <div className={styles.divider} />

      <div className={styles.formArea}>
        <span className={styles.sayLabel}>Say</span>
        <div className={styles.formInputs}>
          <div className={styles.topRow}>
            <div className={styles.namePasswordGroup}>
              <input
                className={styles.inputName}
                type="text"
                placeholder="일촌명(최대 10자)"
                maxLength={10}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className={styles.inputPassword}
                type="password"
                placeholder="비밀번호 (4~12자)"
                maxLength={12}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className={styles.submitButton} onClick={handleSubmit}>
              작성
            </button>
          </div>
          <input
            className={styles.inputMessage}
            type="text"
            placeholder="일촌과 나누고 싶은 이야기를 남겨보세요!(최대 25자)"
            maxLength={25}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.commentItem}>
            <div className={styles.commentDivider} />
            <div className={styles.commentRow}>
              <span className={styles.bullet}>•</span>
              <span className={styles.commentText}>
                {comment.content} ({comment.author}) {comment.date}
              </span>
              <div className={styles.commentActions}>
                <button className={styles.actionButton}>수정</button>
                <button
                  className={styles.actionButton}
                  onClick={() => handleDelete(comment.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
        {comments.length > 0 && <div className={styles.commentDivider} />}
      </div>
    </div>
  );
}
