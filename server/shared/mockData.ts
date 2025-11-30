/**
 * In-memory mock data store
 * Simulates a database for demonstration purposes
 */

import type { User, Post, CreateUserInput, UpdateUserInput, CreatePostInput, UpdatePostInput } from './types.js';

// Mock Users
let users: User[] = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: new Date('2023-01-15').toISOString(),
  },
  {
    id: '2',
    username: 'janesmith',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    createdAt: new Date('2023-02-20').toISOString(),
  },
  {
    id: '3',
    username: 'bobjohnson',
    email: 'bob@example.com',
    firstName: 'Bob',
    lastName: 'Johnson',
    avatar: 'https://i.pravatar.cc/150?img=3',
    createdAt: new Date('2023-03-10').toISOString(),
  },
  {
    id: '4',
    username: 'alicewilliams',
    email: 'alice@example.com',
    firstName: 'Alice',
    lastName: 'Williams',
    createdAt: new Date('2023-04-05').toISOString(),
  },
];

// Mock Posts
let posts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with TypeScript',
    content: 'TypeScript is a powerful superset of JavaScript that adds static typing...',
    published: true,
    authorId: '1',
    tags: ['typescript', 'javascript', 'programming'],
    createdAt: new Date('2023-06-01').toISOString(),
    updatedAt: new Date('2023-06-01').toISOString(),
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    content: 'In this post, we explore advanced patterns like conditional types, mapped types...',
    published: true,
    authorId: '1',
    tags: ['typescript', 'advanced', 'patterns'],
    createdAt: new Date('2023-06-15').toISOString(),
    updatedAt: new Date('2023-06-15').toISOString(),
  },
  {
    id: '3',
    title: 'Vue 3 Composition API',
    content: 'The Composition API in Vue 3 provides a new way to organize component logic...',
    published: true,
    authorId: '2',
    tags: ['vue', 'vue3', 'composition-api'],
    createdAt: new Date('2023-07-01').toISOString(),
    updatedAt: new Date('2023-07-01').toISOString(),
  },
  {
    id: '4',
    title: 'Building Type-Safe APIs',
    content: 'Learn how to build fully type-safe APIs with GraphQL and REST...',
    published: true,
    authorId: '2',
    tags: ['api', 'graphql', 'rest', 'typescript'],
    createdAt: new Date('2023-07-20').toISOString(),
    updatedAt: new Date('2023-07-20').toISOString(),
  },
  {
    id: '5',
    title: 'State Management with Pinia',
    content: 'Pinia is the official state management library for Vue 3...',
    published: true,
    authorId: '3',
    tags: ['vue', 'pinia', 'state-management'],
    createdAt: new Date('2023-08-05').toISOString(),
    updatedAt: new Date('2023-08-05').toISOString(),
  },
  {
    id: '6',
    title: 'Draft: Upcoming TypeScript 5.4 Features',
    content: 'Preview of the upcoming TypeScript 5.4 release...',
    published: false,
    authorId: '1',
    tags: ['typescript', 'preview'],
    createdAt: new Date('2023-08-20').toISOString(),
    updatedAt: new Date('2023-08-20').toISOString(),
  },
  {
    id: '7',
    title: 'Form Validation with Zod',
    content: 'Zod provides runtime type checking and validation...',
    published: true,
    authorId: '4',
    tags: ['zod', 'validation', 'typescript'],
    createdAt: new Date('2023-09-01').toISOString(),
    updatedAt: new Date('2023-09-01').toISOString(),
  },
];

// User operations
export const getUsers = (limit?: number, offset?: number): User[] => {
  let result = [...users];
  if (offset) result = result.slice(offset);
  if (limit) result = result.slice(0, limit);
  return result;
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const createUser = (input: CreateUserInput): User => {
  const newUser: User = {
    id: String(users.length + 1),
    username: input.username,
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id: string, input: UpdateUserInput): User | null => {
  const index = users.findIndex(user => user.id === id);
  if (index === -1) return null;
  
  users[index] = {
    ...users[index],
    ...input,
  };
  return users[index];
};

export const deleteUser = (id: string): boolean => {
  const index = users.findIndex(user => user.id === id);
  if (index === -1) return false;
  
  users.splice(index, 1);
  return true;
};

// Post operations
export const getPosts = (authorId?: string, limit?: number): Post[] => {
  let result = [...posts];
  
  if (authorId) {
    result = result.filter(post => post.authorId === authorId);
  }
  
  if (limit) {
    result = result.slice(0, limit);
  }
  
  return result;
};

export const getPostById = (id: string): Post | undefined => {
  return posts.find(post => post.id === id);
};

export const createPost = (input: CreatePostInput, authorId: string): Post => {
  const newPost: Post = {
    id: String(posts.length + 1),
    title: input.title,
    content: input.content,
    published: input.published ?? false,
    authorId,
    tags: input.tags ?? [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  posts.push(newPost);
  return newPost;
};

export const updatePost = (id: string, input: UpdatePostInput): Post | null => {
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) return null;
  
  posts[index] = {
    ...posts[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };
  return posts[index];
};

export const deletePost = (id: string): boolean => {
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) return false;
  
  posts.splice(index, 1);
  return true;
};

