import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Posts API
export const postsAPI = {
  // Get all posts
  getAllPosts: () => axios.get(`${API_BASE_URL}/posts`),
  
  // Get single post
  getPost: (id) => axios.get(`${API_BASE_URL}/posts/${id}`),
  
  // Create new post
  createPost: (postData) => axios.post(`${API_BASE_URL}/posts`, postData),
  
  // Update post
  updatePost: (id, postData) => axios.put(`${API_BASE_URL}/posts/${id}`, postData),
  
  // Delete post
  deletePost: (id) => axios.delete(`${API_BASE_URL}/posts/${id}`),
  
  // Like/Unlike post
  likePost: (id) => axios.post(`${API_BASE_URL}/posts/${id}/like`),
  
  // Get posts by user
  getPostsByUser: (userId) => axios.get(`${API_BASE_URL}/posts/user/${userId}`),
};

// Comments API
export const commentsAPI = {
  // Get comments for a post
  getComments: (postId) => axios.get(`${API_BASE_URL}/comments/post/${postId}`),
  
  // Create comment
  createComment: (postId, content) => 
    axios.post(`${API_BASE_URL}/comments/post/${postId}`, { content }),
  
  // Delete comment
  deleteComment: (commentId) => axios.delete(`${API_BASE_URL}/comments/${commentId}`),
};
