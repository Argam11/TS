/**
 * Type-Safe State Management with Pinia
 * Comprehensive Pinia store examples
 */

import { defineStore } from "pinia";
import { ref, computed } from "vue";

// ==================== TYPES ====================

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  published: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// ==================== USER STORE (Composition API Style) ====================

export const useUserStore = defineStore("user", () => {
  // State
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters (computed)
  const isAuthenticated = computed(() => user.value !== null && token.value !== null);
  
  const fullName = computed(() => {
    if (!user.value) return "";
    return `${user.value.firstName} ${user.value.lastName}`;
  });

  const initials = computed(() => {
    if (!user.value) return "";
    return `${user.value.firstName[0]}${user.value.lastName[0]}`.toUpperCase();
  });

  // Actions
  async function login(email: string, password: string): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      user.value = data.user;
      token.value = data.token;
      
      // Store in localStorage
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Unknown error";
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function logout(): Promise<void> {
    user.value = null;
    token.value = null;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  }

  async function updateProfile(updates: Partial<User>): Promise<void> {
    if (!user.value) throw new Error("No user logged in");

    isLoading.value = true;
    try {
      const response = await fetch(`/api/users/${user.value.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token.value}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      const updated = await response.json();
      user.value = updated;
      localStorage.setItem("user", JSON.stringify(updated));
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Unknown error";
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  function restoreSession(): void {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      token.value = storedToken;
      user.value = JSON.parse(storedUser);
    }
  }

  return {
    // State
    user,
    token,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    fullName,
    initials,
    // Actions
    login,
    logout,
    updateProfile,
    restoreSession,
  };
});

// ==================== POSTS STORE (Options API Style) ====================

interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  isLoading: boolean;
  error: string | null;
  filter: "all" | "published" | "draft";
}

export const usePostsStore = defineStore("posts", {
  state: (): PostsState => ({
    posts: [],
    currentPost: null,
    isLoading: false,
    error: null,
    filter: "all",
  }),

  getters: {
    filteredPosts(state): Post[] {
      if (state.filter === "all") return state.posts;
      return state.posts.filter(
        post => state.filter === "published" ? post.published : !post.published
      );
    },

    publishedPosts(state): Post[] {
      return state.posts.filter(post => post.published);
    },

    draftPosts(state): Post[] {
      return state.posts.filter(post => !post.published);
    },

    getPostById: (state) => (id: number): Post | undefined => {
      return state.posts.find(post => post.id === id);
    },

    postsCount(state): number {
      return state.posts.length;
    },
  },

  actions: {
    async fetchPosts(): Promise<void> {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        this.posts = await response.json();
      } catch (err) {
        this.error = err instanceof Error ? err.message : "Unknown error";
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchPost(id: number): Promise<void> {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) throw new Error("Failed to fetch post");
        this.currentPost = await response.json();
      } catch (err) {
        this.error = err instanceof Error ? err.message : "Unknown error";
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async createPost(data: Omit<Post, "id" | "createdAt">): Promise<Post> {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Failed to create post");
        const newPost = await response.json();
        this.posts.push(newPost);
        return newPost;
      } catch (err) {
        this.error = err instanceof Error ? err.message : "Unknown error";
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async updatePost(id: number, updates: Partial<Post>): Promise<void> {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });

        if (!response.ok) throw new Error("Failed to update post");
        const updated = await response.json();
        
        const index = this.posts.findIndex(p => p.id === id);
        if (index !== -1) {
          this.posts[index] = updated;
        }
        
        if (this.currentPost?.id === id) {
          this.currentPost = updated;
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : "Unknown error";
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async deletePost(id: number): Promise<void> {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete post");
        
        this.posts = this.posts.filter(p => p.id !== id);
        
        if (this.currentPost?.id === id) {
          this.currentPost = null;
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : "Unknown error";
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    setFilter(filter: "all" | "published" | "draft"): void {
      this.filter = filter;
    },

    clearError(): void {
      this.error = null;
    },
  },
});

// ==================== CART STORE ====================

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const useCartStore = defineStore("cart", () => {
  // State
  const items = ref<CartItem[]>([]);

  // Getters
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  });

  const isEmpty = computed(() => items.value.length === 0);

  // Actions
  function addItem(product: Omit<CartItem, "quantity">): void {
    const existingItem = items.value.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
  }

  function removeItem(productId: number): void {
    const index = items.value.findIndex(item => item.id === productId);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
  }

  function updateQuantity(productId: number, quantity: number): void {
    const item = items.value.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        removeItem(productId);
      }
    }
  }

  function incrementQuantity(productId: number): void {
    const item = items.value.find(item => item.id === productId);
    if (item) {
      item.quantity++;
    }
  }

  function decrementQuantity(productId: number): void {
    const item = items.value.find(item => item.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity === 0) {
        removeItem(productId);
      }
    }
  }

  function clearCart(): void {
    items.value = [];
  }

  return {
    items,
    itemCount,
    totalPrice,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  };
});

// ==================== NOTIFICATION STORE ====================

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration: number;
}

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<Notification[]>([]);

  function show(
    type: Notification["type"],
    message: string,
    duration: number = 3000
  ): string {
    const id = `notification-${Date.now()}-${Math.random()}`;
    const notification: Notification = { id, type, message, duration };
    
    notifications.value.push(notification);

    if (duration > 0) {
      setTimeout(() => {
        remove(id);
      }, duration);
    }

    return id;
  }

  function success(message: string, duration?: number): string {
    return show("success", message, duration);
  }

  function error(message: string, duration?: number): string {
    return show("error", message, duration);
  }

  function warning(message: string, duration?: number): string {
    return show("warning", message, duration);
  }

  function info(message: string, duration?: number): string {
    return show("info", message, duration);
  }

  function remove(id: string): void {
    const index = notifications.value.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  }

  function clear(): void {
    notifications.value = [];
  }

  return {
    notifications,
    show,
    success,
    error,
    warning,
    info,
    remove,
    clear,
  };
});

// ==================== USAGE EXAMPLES ====================

export function storeExamples(): void {
  // User store
  const userStore = useUserStore();
  
  // Login
  userStore.login("user@example.com", "password");
  
  // Check authentication
  if (userStore.isAuthenticated) {
    console.log(`Welcome ${userStore.fullName}!`);
  }

  // Posts store
  const postsStore = usePostsStore();
  
  // Fetch posts
  postsStore.fetchPosts();
  
  // Filter posts
  postsStore.setFilter("published");
  console.log("Published posts:", postsStore.filteredPosts);

  // Cart store
  const cartStore = useCartStore();
  
  // Add item
  cartStore.addItem({
    id: 1,
    name: "Product 1",
    price: 19.99,
  });
  
  console.log(`Cart total: $${cartStore.totalPrice.toFixed(2)}`);

  // Notifications
  const notificationStore = useNotificationStore();
  
  notificationStore.success("Operation successful!");
  notificationStore.error("Something went wrong!");
}

