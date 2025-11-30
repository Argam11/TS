/**
 * Type-safe REST API Client
 * Uses generated types from OpenAPI spec
 */

const API_BASE_URL = 'http://localhost:3000/api';

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

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  published?: boolean;
  tags?: string[];
}

class RestApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  // User endpoints
  async getUsers(params?: { limit?: number; offset?: number }): Promise<User[]> {
    const query = new URLSearchParams();
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.offset) query.append('offset', params.offset.toString());
    
    const queryString = query.toString();
    return this.request<User[]>(`/users${queryString ? `?${queryString}` : ''}`);
  }

  async getUser(id: string): Promise<User> {
    return this.request<User>(`/users/${id}`);
  }

  async createUser(data: CreateUserRequest): Promise<User> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    return this.request<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: string): Promise<void> {
    return this.request<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Post endpoints
  async getPosts(params?: { authorId?: string; limit?: number }): Promise<Post[]> {
    const query = new URLSearchParams();
    if (params?.authorId) query.append('authorId', params.authorId);
    if (params?.limit) query.append('limit', params.limit.toString());
    
    const queryString = query.toString();
    return this.request<Post[]>(`/posts${queryString ? `?${queryString}` : ''}`);
  }

  async getPost(id: string): Promise<Post> {
    return this.request<Post>(`/posts/${id}`);
  }

  async createPost(data: CreatePostRequest): Promise<Post> {
    return this.request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePost(id: string, data: Partial<CreatePostRequest>): Promise<Post> {
    return this.request<Post>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePost(id: string): Promise<void> {
    return this.request<void>(`/posts/${id}`, {
      method: 'DELETE',
    });
  }
}

export const restClient = new RestApiClient();

// Example usage functions
export async function fetchUsersExample(): Promise<void> {
  try {
    const users = await restClient.getUsers({ limit: 10 });
    console.log('Users:', users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

export async function fetchUserPostsExample(userId: string): Promise<void> {
  try {
    const user = await restClient.getUser(userId);
    const posts = await restClient.getPosts({ authorId: userId });
    console.log('User:', user);
    console.log('Posts:', posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
  }
}

