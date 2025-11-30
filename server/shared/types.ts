/**
 * Shared TypeScript types for both GraphQL and REST servers
 */

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUserInput {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  published?: boolean;
  tags?: string[];
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  published?: boolean;
  tags?: string[];
}

