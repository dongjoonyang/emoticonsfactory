import client from './client'

export interface CommentResponse {
  id: number
  author: string
  content: string
  date: string
}

export function getComments(): Promise<CommentResponse[]> {
  return client.get('/api/comments').then((res) => res.data)
}

export function createComment(
  author: string,
  password: string,
  content: string,
): Promise<CommentResponse> {
  return client.post('/api/comments', { author, password, content }).then((res) => res.data)
}

export function editComment(
  id: number,
  password: string,
  content: string,
): Promise<CommentResponse> {
  return client.put(`/api/comments/${id}`, { password, content }).then((res) => res.data)
}

export function deleteComment(id: number, password: string): Promise<void> {
  return client.delete(`/api/comments/${id}`, { data: { password } }).then(() => undefined)
}
