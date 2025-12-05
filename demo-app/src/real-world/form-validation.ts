/**
 * Form Validation with Zod and TypeScript
 * Type-safe schema validation
 */

import { z } from "zod";

// ==================== BASIC SCHEMAS ====================

// Simple user schema
export const userSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  
  email: z.string()
    .email("Invalid email address")
    .toLowerCase(),
  
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  
  confirmPassword: z.string(),
  
  age: z.number()
    .int("Age must be an integer")
    .min(18, "Must be 18 or older")
    .max(120, "Invalid age"),
  
  terms: z.boolean()
    .refine(val => val === true, "You must accept the terms and conditions"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Infer TypeScript type from Zod schema
export type UserFormData = z.infer<typeof userSchema>;

// ==================== PROFILE SCHEMA ====================

export const profileSchema = z.object({
  firstName: z.string()
    .min(1, "First name is required")
    .max(50, "First name too long"),
  
  lastName: z.string()
    .min(1, "Last name is required")
    .max(50, "Last name too long"),
  
  bio: z.string()
    .max(500, "Bio must be less than 500 characters")
    .optional(),
  
  website: z.string()
    .url("Invalid URL")
    .optional()
    .or(z.literal("")),
  
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .optional(),
  
  birthDate: z.string()
    .refine(
      (val) => {
        const date = new Date(val);
        const age = (Date.now() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
        return age >= 18 && age <= 120;
      },
      "Must be between 18 and 120 years old"
    ),
  
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]),
  
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  
  newsletter: z.boolean().default(false),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

// ==================== ADDRESS SCHEMA ====================

export const addressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  
  city: z.string().min(1, "City is required"),
  
  state: z.string().min(2, "State is required").max(2, "Use 2-letter state code"),
  
  zipCode: z.string()
    .regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  
  country: z.string().min(1, "Country is required"),
});

export type AddressData = z.infer<typeof addressSchema>;

// ==================== NESTED SCHEMA ====================

export const orderSchema = z.object({
  customer: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone"),
  }),
  
  shippingAddress: addressSchema,
  
  billingAddress: addressSchema.optional(),
  
  items: z.array(
    z.object({
      productId: z.number().positive(),
      quantity: z.number().int().positive().max(100),
      price: z.number().positive(),
    })
  ).min(1, "Order must contain at least one item"),
  
  sameAsBilling: z.boolean().default(false),
  
  total: z.number().positive(),
}).refine(
  (data) => {
    const calculatedTotal = data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return Math.abs(calculatedTotal - data.total) < 0.01;
  },
  {
    message: "Total doesn't match item prices",
    path: ["total"],
  }
);

export type OrderData = z.infer<typeof orderSchema>;

// ==================== DYNAMIC SCHEMA ====================

// Schema that changes based on user type
export const createUserTypeSchema = (userType: "admin" | "user") => {
  const baseSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  });

  if (userType === "admin") {
    return baseSchema.extend({
      role: z.enum(["admin", "superadmin"]),
      permissions: z.array(z.string()).min(1),
    });
  }

  return baseSchema.extend({
    role: z.literal("user"),
  });
};

// ==================== VALIDATION HELPERS ====================

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
}

export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  try {
    const validated = schema.parse(data);
    return {
      success: true,
      data: validated,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join(".");
        errors[path] = err.message;
      });
      return {
        success: false,
        errors,
      };
    }
    return {
      success: false,
      errors: { _form: "Validation failed" },
    };
  }
}

export async function validateAsync<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<ValidationResult<T>> {
  try {
    const validated = await schema.parseAsync(data);
    return {
      success: true,
      data: validated,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join(".");
        errors[path] = err.message;
      });
      return {
        success: false,
        errors,
      };
    }
    return {
      success: false,
      errors: { _form: "Validation failed" },
    };
  }
}

// ==================== FIELD-LEVEL VALIDATION ====================

export function validateField<T>(
  schema: z.ZodSchema<T>,
  fieldPath: string,
  value: any,
  fullData: Partial<T>
): string | null {
  try {
    // Create a partial object with just this field
    const testData = { ...fullData, [fieldPath]: value };
    schema.parse(testData);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldError = error.errors.find(
        (err) => err.path.join(".") === fieldPath
      );
      return fieldError?.message || null;
    }
    return null;
  }
}

// ==================== TRANSFORM AND PREPROCESS ====================

export const preprocessedSchema = z.object({
  name: z.string().trim().min(1),
  
  age: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number().int().positive()
  ),
  
  email: z.string()
    .email()
    .transform((email) => email.toLowerCase()),
  
  tags: z.preprocess(
    (val) => (typeof val === "string" ? val.split(",").map(s => s.trim()) : val),
    z.array(z.string())
  ),
});

export type PreprocessedData = z.infer<typeof preprocessedSchema>;

// ==================== CUSTOM VALIDATION ====================

export const customValidationSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
}).refine(
  (data) => new Date(data.endDate) > new Date(data.startDate),
  {
    message: "End date must be after start date",
    path: ["endDate"],
  }
);

// Password strength validator
z.string()
  .refine(
    (password) => {
      const hasLower = /[a-z]/.test(password);
      const hasUpper = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecial = /[^A-Za-z0-9]/.test(password);
      return hasLower && hasUpper && hasNumber && hasSpecial;
    },
    "Password must contain lowercase, uppercase, number, and special character"
  );

// Unique username validator (async)
export const uniqueUsernameSchema = z.string()
  .min(3)
  .refine(
    async (username) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const taken = ["admin", "root", "user"];
      return !taken.includes(username.toLowerCase());
    },
    "Username is already taken"
  );

// ==================== EXAMPLES ====================

export const examples = {
  validateUser: () => {
    const userData = {
      username: "johndoe",
      email: "john@example.com",
      password: "SecurePass123!",
      confirmPassword: "SecurePass123!",
      age: 25,
      terms: true,
    };

    const result = validateForm(userSchema, userData);
    return result;
  },

  validateProfile: () => {
    const profileData = {
      firstName: "John",
      lastName: "Doe",
      bio: "Software developer",
      website: "https://johndoe.com",
      birthDate: "1998-01-15",
      gender: "male" as const,
      interests: ["coding", "reading"],
      newsletter: true,
    };

    const result = validateForm(profileSchema, profileData);
    return result;
  },

  preprocessData: () => {
    const rawData = {
      name: "  John Doe  ",
      age: "25",
      email: "JOHN@EXAMPLE.COM",
      tags: "typescript, javascript, vue",
    };

    const result = validateForm(preprocessedSchema, rawData);
    return result;
  },
};

