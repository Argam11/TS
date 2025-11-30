/**
 * GraphQL Resolvers
 * Implements the query and mutation operations
 */

import * as db from '../shared/mockData.js';
import type { CreateUserInput, UpdateUserInput, CreatePostInput, UpdatePostInput } from '../shared/types.js';

export const resolvers = {
  Query: {
    user: (_: any, { id }: { id: string }) => {
      return db.getUserById(id);
    },
    
    users: (_: any, { limit, offset }: { limit?: number; offset?: number }) => {
      return db.getUsers(limit, offset);
    },
    
    post: (_: any, { id }: { id: string }) => {
      return db.getPostById(id);
    },
    
    posts: (_: any, { authorId, limit, offset }: { authorId?: string; limit?: number; offset?: number }) => {
      return db.getPosts(authorId, limit);
    },
    
    me: () => {
      // Return first user as "current user" for demo
      return db.getUserById('1');
    },
  },

  Mutation: {
    createUser: (_: any, { input }: { input: CreateUserInput }) => {
      return db.createUser(input);
    },
    
    updateUser: (_: any, { id, input }: { id: string; input: UpdateUserInput }) => {
      const updated = db.updateUser(id, input);
      if (!updated) {
        throw new Error(`User with id ${id} not found`);
      }
      return updated;
    },
    
    deleteUser: (_: any, { id }: { id: string }) => {
      return db.deleteUser(id);
    },
    
    createPost: (_: any, { input }: { input: CreatePostInput }) => {
      // Use first user as author for demo
      return db.createPost(input, '1');
    },
    
    updatePost: (_: any, { id, input }: { id: string; input: UpdatePostInput }) => {
      const updated = db.updatePost(id, input);
      if (!updated) {
        throw new Error(`Post with id ${id} not found`);
      }
      return updated;
    },
    
    deletePost: (_: any, { id }: { id: string }) => {
      return db.deletePost(id);
    },
  },

  User: {
    posts: (parent: { id: string }) => {
      return db.getPosts(parent.id);
    },
  },

  Post: {
    author: (parent: { authorId: string }) => {
      return db.getUserById(parent.authorId);
    },
    metadata: () => {
      // Return sample metadata
      return { views: 100, likes: 10 };
    },
  },
};

