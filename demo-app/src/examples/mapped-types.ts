/**
 * Mapped Types in TypeScript
 * Transform existing types into new types
 */

// ==================== BASIC MAPPED TYPES ====================

// Convert all properties to boolean
export type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

interface Features {
  darkMode: () => void;
  newUserProfile: () => void;
  experimental: () => void;
}

export type FeatureOptions = OptionsFlags<Features>;
// { darkMode: boolean; newUserProfile: boolean; experimental: boolean }

// ==================== MAPPING MODIFIERS ====================

// Remove readonly
export type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type ReadonlyPerson = {
  readonly name: string;
  readonly age: number;
};

export type MutablePerson = CreateMutable<ReadonlyPerson>;
// { name: string; age: number }

// Remove optional
export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

interface PartialUser {
  name?: string;
  age?: number;
  email?: string;
}

export type RequiredUser = Concrete<PartialUser>;
// { name: string; age: number; email: string }

// Add readonly
export type CreateImmutable<Type> = {
  +readonly [Property in keyof Type]: Type[Property];
};

// Add optional
export type CreateOptional<Type> = {
  [Property in keyof Type]+?: Type[Property];
};

// ==================== KEY REMAPPING WITH 'AS' ====================

// TypeScript 4.1+ feature
export type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

export type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number; getLocation: () => string }

// Setters
export type Setters<Type> = {
  [Property in keyof Type as `set${Capitalize<string & Property>}`]: (value: Type[Property]) => void;
};

export type PersonSetters = Setters<Person>;
// { setName: (value: string) => void; setAge: (value: number) => void; ... }

// ==================== FILTERING KEYS ====================

// Remove specific keys
export type RemoveKindField<T> = {
  [K in keyof T as Exclude<K, "kind">]: T[K];
};

interface Circle {
  kind: "circle";
  radius: number;
}

export type CircleWithoutKind = RemoveKindField<Circle>;
// { radius: number }

// Filter by value type
export type ExtractFunctions<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
};

interface Mixed {
  name: string;
  age: number;
  greet: () => void;
  calculate: (x: number) => number;
}

export type OnlyFunctions = ExtractFunctions<Mixed>;
// { greet: () => void; calculate: (x: number) => number }

// Filter out functions
export type OmitFunctions<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

export type OnlyData = OmitFunctions<Mixed>;
// { name: string; age: number }

// ==================== TEMPLATE LITERAL KEYS ====================

export type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}Change`]: (value: T[K]) => void;
};

interface FormData {
  username: string;
  email: string;
  age: number;
}

export type FormHandlers = EventHandlers<FormData>;
// {
//   onUsernameChange: (value: string) => void;
//   onEmailChange: (value: string) => void;
//   onAgeChange: (value: number) => void;
// }

// ==================== NESTED MAPPING ====================

// Deep readonly
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface NestedData {
  user: {
    name: string;
    profile: {
      bio: string;
      avatar: string;
    };
  };
}

export type ReadonlyNestedData = DeepReadonly<NestedData>;
// All properties at all levels are readonly

// Deep partial
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type PartialNestedData = DeepPartial<NestedData>;
// All properties at all levels are optional

// ==================== CONDITIONAL MAPPED TYPES ====================

// Make only string properties optional
export type OptionalStrings<T> = {
  [K in keyof T]: T[K] extends string ? T[K] | undefined : T[K];
};

interface UserData {
  id: number;
  username: string;
  email: string;
  age: number;
}

export type UserWithOptionalStrings = OptionalStrings<UserData>;
// { id: number; username: string | undefined; email: string | undefined; age: number }

// Nullify specific types
export type Nullify<T> = {
  [K in keyof T]: T[K] extends object ? Nullify<T[K]> : T[K] | null;
};

// ==================== PRACTICAL EXAMPLES ====================

// 1. Pick by type
export type PickByType<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

interface Example {
  id: number;
  name: string;
  age: number;
  email: string;
  active: boolean;
}

export type StringFields = PickByType<Example, string>;
// { name: string; email: string }

export type NumberFields = PickByType<Example, number>;
// { id: number; age: number }

// 2. Omit by type
export type OmitByType<T, V> = {
  [K in keyof T as T[K] extends V ? never : K]: T[K];
};

export type NonStringFields = OmitByType<Example, string>;
// { id: number; age: number; active: boolean }

// 3. Prefix keys
export type PrefixKeys<T, P extends string> = {
  [K in keyof T as `${P}${Capitalize<string & K>}`]: T[K];
};

export type PrefixedUser = PrefixKeys<Person, "user">;
// { userName: string; userAge: number; userLocation: string }

// 4. API response wrapper
export type ApiData<T> = {
  [K in keyof T as `${string & K}Data`]: T[K];
};

interface UserInfo {
  name: string;
  email: string;
}

export type UserApiData = ApiData<UserInfo>;
// { nameData: string; emailData: string }

// ==================== MAPPED TUPLE TYPES ====================

// Convert tuple to object
export type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: K;
};

const tuple = ["name", "age", "email"] as const;
export type TupleObj = TupleToObject<typeof tuple>;
// { name: "name"; age: "age"; email: "email" }

// ==================== PROPERTY VALUE UNION ====================

export type ValueOf<T> = T[keyof T];

interface Status {
  pending: "PENDING";
  approved: "APPROVED";
  rejected: "REJECTED";
}

export type StatusValue = ValueOf<Status>;
// "PENDING" | "APPROVED" | "REJECTED"

// ==================== WRITABLE (REMOVE READONLY) ====================

export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

type ImmutableConfig = {
  readonly apiUrl: string;
  readonly timeout: number;
};

export type MutableConfig = Writable<ImmutableConfig>;
// { apiUrl: string; timeout: number }

// ==================== MAKE SPECIFIC KEYS OPTIONAL ====================

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface UserProfile {
  id: number;
  username: string;
  email: string;
  age: number;
  bio: string;
}

export type UserProfileUpdate = PartialBy<UserProfile, "age" | "bio">;
// { id: number; username: string; email: string; age?: number; bio?: string }

// ==================== MAKE SPECIFIC KEYS REQUIRED ====================

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

interface PartialForm {
  name?: string;
  email?: string;
  age?: number;
}

export type FormWithRequiredEmail = RequiredBy<PartialForm, "email">;
// { name?: string; email: string; age?: number }

// ==================== EXAMPLES ====================

export const examples = {
  basic: {
    featureOptions: {
      darkMode: true,
      newUserProfile: false,
      experimental: true,
    } as FeatureOptions,
  },
  modifiers: {
    mutablePerson: { name: "Alice", age: 30 } as MutablePerson,
  },
  keyRemapping: {
    getters: {
      getName: () => "Alice",
      getAge: () => 30,
    } as Partial<PersonGetters>,
  },
  filtering: {
    onlyFunctions: {
      greet: () => console.log("Hello"),
      calculate: (x: number) => x * 2,
    } as OnlyFunctions,
  },
};

