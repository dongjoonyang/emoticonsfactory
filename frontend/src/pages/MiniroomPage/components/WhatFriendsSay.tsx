import { useEffect, useState } from 'react';
import { getComments, createComment, editComment, deleteComment, CommentResponse } from '../../../shared/api/comments';
import styles from './WhatFriendsSay.module.css';

type ActiveAction = { type: 'edit' | 'delete'; id: number } | null;

export default function WhatFriendsSay() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [activeAction, setActiveAction] = useState<ActiveAction>(null);
  const [actionPassword, setActionPassword] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    getComments().then(setComments).catch(console.error);
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !password.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      const created = await createComment(name, password, message);
      setComments((prev) => [...prev, created]);
      setName('');
      setPassword('');
      setMessage('');
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (comment: CommentResponse) => {
    setActiveAction({ type: 'edit', id: comment.id });
    setEditContent(comment.content);
    setActionPassword('');
  };

  const startDelete = (id: number) => {
    setActiveAction({ type: 'delete', id });
    setActionPassword('');
  };

  const cancelAction = () => {
    setActiveAction(null);
    setActionPassword('');
    setEditContent('');
  };

  const handleEditConfirm = async (id: number) => {
    if (!editContent.trim() || !actionPassword.trim()) return;
    try {
      const updated = await editComment(id, actionPassword, editContent);
      setComments((prev) => prev.map((c) => (c.id === id ? updated : c)));
      cancelAction();
    } catch (e: any) {
      if (e?.response?.status === 403) alert('비밀번호가 틀렸습니다.');
      else console.error(e);
    }
  };

  const handleDeleteConfirm = async (id: number) => {
    if (!actionPassword.trim()) return;
    try {
      await deleteComment(id, actionPassword);
      setComments((prev) => prev.filter((c) => c.id !== id));
      cancelAction();
    } catch (e: any) {
      if (e?.response?.status === 403) alert('비밀번호가 틀렸습니다.');
      else console.error(e);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>What Friends Say</h2>
        <span className={styles.subtitle}>이야기를 남겨보세요.</span>
      </div>

      <div className={styles.divider} />

      <div id="comment-form" className={styles.formArea}>
        <span className={styles.sayLabel}>Say</span>
        <div className={styles.formColumns}>
          <div className={styles.inputsColumn}>
            <div className={styles.namePasswordRow}>
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
            <input
              className={styles.inputMessage}
              type="text"
              placeholder="일촌과 나누고 싶은 이야기를 남겨보세요!(최대 100자)"
              maxLength={100}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button className={styles.submitButton} onClick={handleSubmit} disabled={submitting}>
            {submitting ? '저장 중...' : '작성'}
          </button>
        </div>
      </div>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          const isEditing = activeAction?.type === 'edit' && activeAction.id === comment.id;
          const isDeleting = activeAction?.type === 'delete' && activeAction.id === comment.id;

          return (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.commentDivider} />

              {isEditing ? (
                <div className={styles.commentRow}>
                  <span className={styles.bullet}>•</span>
                  <input
                    className={styles.inlineInput}
                    type="text"
                    maxLength={25}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <input
                    className={styles.inlinePassword}
                    type="password"
                    placeholder="비밀번호"
                    maxLength={12}
                    value={actionPassword}
                    onChange={(e) => setActionPassword(e.target.value)}
                  />
                  <div className={styles.commentActions}>
                    <button className={styles.actionButton} onClick={() => handleEditConfirm(comment.id)}>확인</button>
                    <button className={styles.actionButton} onClick={cancelAction}>취소</button>
                  </div>
                </div>
              ) : isDeleting ? (
                <div className={styles.commentRow}>
                  <span className={styles.bullet}>•</span>
                  <span className={styles.commentText}>
                    {comment.content} ({comment.author}) {comment.date}
                  </span>
                  <input
                    className={styles.inlinePassword}
                    type="password"
                    placeholder="비밀번호"
                    maxLength={12}
                    value={actionPassword}
                    onChange={(e) => setActionPassword(e.target.value)}
                  />
                  <div className={styles.commentActions}>
                    <button className={styles.actionButton} onClick={() => handleDeleteConfirm(comment.id)}>확인</button>
                    <button className={styles.actionButton} onClick={cancelAction}>취소</button>
                  </div>
                </div>
              ) : (
                <div className={styles.commentRow}>
                  <span className={styles.bullet}>•</span>
                  <span className={styles.commentText}>
                    {comment.content} ({comment.author}) {comment.date}
                  </span>
                  <div className={styles.commentActions}>
                    <button className={styles.actionButton} onClick={() => startEdit(comment)}>수정</button>
                    <button className={styles.actionButton} onClick={() => startDelete(comment.id)}>삭제</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {comments.length > 0 && <div className={styles.commentDivider} />}
      </div>
    </div>
  );
}
