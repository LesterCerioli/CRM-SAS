import axios from 'axios';

export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  url: string;
}

const validCategories = ['backend', 'frontend', 'devOps'];

export const getPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>('http://localhost:8080/posts');
  return response.data;
};

export const createPost = async (data: { title: string, content: string, category: string }): Promise<Post | null> => {
  if (!data.title || !data.content || !validCategories.includes(data.category)) {
    return null;
  }
  
  const postUrl = `http://localhost:3000/blog/posts/${data.category}`;
  const newPost: Post = {
    id: Date.now(),
    title: data.title,
    content: data.content,
    category: data.category,
    url: postUrl
  };
  
  return newPost;
};
