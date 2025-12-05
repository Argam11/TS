/**
 * Type-Safe API Integration
 * Patterns for working with APIs in TypeScript
 */

// ==================== TYPED API CLIENT ====================

export interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers?: Record<string, string>;
}

export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
}

export class ApiClient {
  constructor(private config: ApiConfig) {}

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${this.config.baseURL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...this.config.headers,
      ...options.headers,
    };

    const response = await fetch(url, {
      method: options.method || "GET",
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new ApiError(response.status, `Request failed: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T, D = any>(endpoint: string, data: D): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data,
    });
  }

  async put<T, D = any>(endpoint: string, data: D): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

// ==================== ERROR HANDLING ====================

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = "ApiError";
  }

  isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500;
  }

  isServerError(): boolean {
    return this.statusCode >= 500;
  }
}

// ==================== RESULT TYPE PATTERN ====================

export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

export async function safeApiCall<T>(
  fn: () => Promise<T>
): Promise<Result<T, ApiError>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, error };
    }
    return {
      success: false,
      error: new ApiError(500, "Unknown error", error),
    };
  }
}

// ==================== TYPED ENDPOINTS ====================

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
  author?: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface CreatePostDto {
  title: string;
  content: string;
  published?: boolean;
}

// ==================== API SERVICE ====================

export class UserService {
  constructor(private client: ApiClient) {}

  async getUsers(): Promise<User[]> {
    return this.client.get<User[]>("/users");
  }

  async getUser(id: number): Promise<User> {
    return this.client.get<User>(`/users/${id}`);
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return this.client.post<User, CreateUserDto>("/users", data);
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    return this.client.put<User, UpdateUserDto>(`/users/${id}`, data);
  }

  async deleteUser(id: number): Promise<void> {
    return this.client.delete<void>(`/users/${id}`);
  }
}

export class PostService {
  constructor(private client: ApiClient) {}

  async getPosts(params?: { authorId?: number; limit?: number }): Promise<Post[]> {
    const query = new URLSearchParams();
    if (params?.authorId) query.append("authorId", params.authorId.toString());
    if (params?.limit) query.append("limit", params.limit.toString());
    
    const queryString = query.toString();
    const endpoint = `/posts${queryString ? `?${queryString}` : ""}`;
    
    return this.client.get<Post[]>(endpoint);
  }

  async getPost(id: number): Promise<Post> {
    return this.client.get<Post>(`/posts/${id}`);
  }

  async createPost(data: CreatePostDto): Promise<Post> {
    return this.client.post<Post, CreatePostDto>("/posts", data);
  }

  async updatePost(id: number, data: Partial<CreatePostDto>): Promise<Post> {
    return this.client.put<Post, Partial<CreatePostDto>>(`/posts/${id}`, data);
  }

  async deletePost(id: number): Promise<void> {
    return this.client.delete<void>(`/posts/${id}`);
  }
}

// ==================== RESPONSE WRAPPERS ====================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  timestamp: string;
}

// ==================== QUERY BUILDER ====================

export class QueryBuilder {
  private params: URLSearchParams = new URLSearchParams();

  where(key: string, value: string | number | boolean): this {
    this.params.append(key, String(value));
    return this;
  }

  limit(count: number): this {
    this.params.set("limit", String(count));
    return this;
  }

  offset(count: number): this {
    this.params.set("offset", String(count));
    return this;
  }

  orderBy(field: string, direction: "ASC" | "DESC" = "ASC"): this {
    this.params.set("orderBy", field);
    this.params.set("order", direction);
    return this;
  }

  build(): string {
    const queryString = this.params.toString();
    return queryString ? `?${queryString}` : "";
  }
}

// ==================== CACHE IMPLEMENTATION ====================

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}

export class ApiCache {
  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, data: T, expiresIn: number = 60000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.expiresIn) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }
}

// ==================== CACHED API CLIENT ====================

export class CachedApiClient extends ApiClient {
  private cache = new ApiCache();

  async getCached<T>(endpoint: string, cacheTime: number = 60000): Promise<T> {
    const cached = this.cache.get<T>(endpoint);
    if (cached) {
      return cached;
    }

    const data = await this.get<T>(endpoint);
    this.cache.set(endpoint, data, cacheTime);
    return data;
  }

  clearCache(): void {
    this.cache.clear();
  }
}

// ==================== USAGE EXAMPLES ====================

// Initialize client
export const apiClient = new ApiClient({
  baseURL: "https://api.example.com/v1",
  timeout: 5000,
  headers: {
    "Authorization": "Bearer token",
  },
});

// Create services
export const userService = new UserService(apiClient);
export const postService = new PostService(apiClient);

// Example usage
export async function example(): Promise<void> {
  // Get all users
  const users = await userService.getUsers();
  console.log("Users:", users);

  // Get single user with error handling
  const result = await safeApiCall(() => userService.getUser(1));
  
  if (result.success) {
    console.log("User:", result.data);
  } else {
    console.error("Error:", result.error.message);
    if (result.error.isClientError()) {
      console.log("Client error - check your request");
    }
  }

  // Create user
  await userService.createUser({
    username: "johndoe",
    email: "john@example.com",
    password: "secure123",
    firstName: "John",
    lastName: "Doe",
  });

  // Get posts with query builder
  new QueryBuilder()
    .where("published", true)
    .limit(10)
    .orderBy("createdAt", "DESC")
    .build();
  
  // const posts = await apiClient.get<Post[]>(`/posts${query}`);
}

