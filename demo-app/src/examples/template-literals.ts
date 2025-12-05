/**
 * Template Literal Types in TypeScript
 * Type-level string manipulation
 */

// ==================== BASIC TEMPLATE LITERALS ====================

export type World = "world";
export type Greeting = `hello ${World}`;  // "hello world"

export type EmailDomain = "example.com";
export type Email = `user@${EmailDomain}`;  // "user@example.com"

// With string literal unions
export type Direction = "top" | "right" | "bottom" | "left";
export type MarginProp = `margin${Capitalize<Direction>}`;
// "marginTop" | "marginRight" | "marginBottom" | "marginLeft"

// ==================== STRING UNIONS WITH TEMPLATE LITERALS ====================

export type EmailLocaleIDs = "welcome_email" | "email_heading";
export type FooterLocaleIDs = "footer_title" | "footer_sendoff";

export type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"

// Multiple unions
export type Size = "small" | "medium" | "large";
export type Color = "red" | "green" | "blue";
export type Variant = `${Size}-${Color}`;
// "small-red" | "small-green" | "small-blue" | "medium-red" | ...

// ==================== INTRINSIC STRING MANIPULATION TYPES ====================

// Uppercase
export type UppercaseGreeting = Uppercase<"hello world">;  // "HELLO WORLD"
export type Shout = Uppercase<"stop">;  // "STOP"

// Lowercase
export type LowercaseGreeting = Lowercase<"HELLO WORLD">;  // "hello world"
export type Whisper = Lowercase<"QUIET">;  // "quiet"

// Capitalize
export type CapitalizedName = Capitalize<"alice">;  // "Alice"
export type Title = Capitalize<"typescript guide">;  // "Typescript guide"

// Uncapitalize
export type UncapitalizedName = Uncapitalize<"Alice">;  // "alice"
export type Lower = Uncapitalize<"TypeScript">;  // "typeScript"

// ==================== PRACTICAL EXAMPLES ====================

// 1. HTTP Methods
export type HTTPMethod = "get" | "post" | "put" | "delete" | "patch";
export type UppercaseHTTPMethod = Uppercase<HTTPMethod>;
// "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

// 2. Event names
export type EventName = "click" | "focus" | "blur" | "change";
export type EventHandler = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus" | "onBlur" | "onChange"

// 3. CSS Classes
export type Theme = "light" | "dark";
export type Component = "button" | "input" | "card";
export type ClassName = `${Theme}-${Component}`;
// "light-button" | "light-input" | "light-card" | "dark-button" | ...

// ==================== ADVANCED PATTERNS ====================

// 4. Route params extractor
export type ExtractRouteParams<T extends string> =
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractRouteParams<Rest>]: string }
    : T extends `${infer _Start}:${infer Param}`
    ? { [K in Param]: string }
    : {};

export type Route1Params = ExtractRouteParams<"/user/:id">;
// { id: string }

export type Route2Params = ExtractRouteParams<"/user/:userId/post/:postId">;
// { userId: string; postId: string }

// 5. API Endpoint builder
export type APIMethod = "get" | "post" | "put" | "delete";
export type Endpoint = "users" | "posts" | "comments";
export type APIRoute = `/${Lowercase<APIMethod>}/${Endpoint}`;
// "/get/users" | "/get/posts" | ... | "/delete/comments"

// 6. CSS property builder
export type CSSPropertyName = 
  | "color"
  | "background"
  | "fontSize"
  | "padding"
  | "margin";

export type CSSProperty = `${CSSPropertyName}: ${string};`;

export const validCSS: CSSProperty = "color: red;";
export const validCSS2: CSSProperty = "fontSize: 16px;";

// ==================== PROP EVENT SOURCE PATTERN ====================

// Type-safe event system
export type PropEventSource<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void
  ): void;
};

export interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

export type WatchedPerson = Person & PropEventSource<Person>;

// Usage example
export function createWatchedPerson(): WatchedPerson {
  const listeners: Map<string, Function[]> = new Map();
  
  return {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    on(eventName, callback) {
      const events = listeners.get(eventName) || [];
      events.push(callback);
      listeners.set(eventName, events);
    },
  };
}

const watched = createWatchedPerson();
watched.on("firstNameChanged", (newName) => {
  console.log(`Name changed to ${newName.toUpperCase()}`);
});
watched.on("ageChanged", (newAge) => {
  if (newAge < 0) console.warn("Invalid age");
});

// ==================== DATABASE QUERIES ====================

export type TableName = "users" | "posts" | "comments";
export type QueryAction = "select" | "insert" | "update" | "delete";
export type Query = `${Uppercase<QueryAction>} * FROM ${TableName}`;

export const selectUsers: Query = "SELECT * FROM users";
export const deleteComments: Query = "DELETE * FROM comments";

// ==================== TYPE-SAFE STRING BUILDER ====================

// Build type-safe paths
export type PathSegment = string;
export type Path<T extends PathSegment[]> = T extends [infer First extends string, ...infer Rest]
  ? Rest extends PathSegment[]
    ? `/${First}${Path<Rest>}`
    : `/${First}`
  : "";

export type UserPath = Path<["api", "v1", "users"]>;  // "/api/v1/users"
export type PostPath = Path<["api", "v1", "posts"]>;  // "/api/v1/posts"

// ==================== VALIDATION PATTERNS ====================

// Email validation pattern
export type EmailPattern = `${string}@${string}.${string}`;

export function sendEmail(email: EmailPattern): void {
  console.log(`Sending email to ${email}`);
}

// Valid
sendEmail("user@example.com");
sendEmail("admin@company.co.uk");

// URL pattern
export type URLProtocol = "http" | "https";
export type URL = `${URLProtocol}://${string}`;

export function fetchURL(url: URL): void {
  console.log(`Fetching ${url}`);
}

fetchURL("https://example.com");
fetchURL("http://localhost:3000");

// ==================== GETTER/SETTER PATTERN ====================

export type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

export type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

interface User {
  name: string;
  age: number;
  email: string;
}

export type UserGetters = Getters<User>;
// {
//   getName: () => string;
//   getAge: () => number;
//   getEmail: () => string;
// }

export type UserSetters = Setters<User>;
// {
//   setName: (value: string) => void;
//   setAge: (value: number) => void;
//   setEmail: (value: string) => void;
// }

export type UserAccessors = User & UserGetters & UserSetters;

// ==================== ACTION TYPES FOR REDUX-STYLE ====================

export type Action = "ADD" | "UPDATE" | "DELETE";
export type Entity = "USER" | "POST" | "COMMENT";
export type ActionType = `${Action}_${Entity}`;

// "ADD_USER" | "ADD_POST" | "ADD_COMMENT" | 
// "UPDATE_USER" | "UPDATE_POST" | "UPDATE_COMMENT" |
// "DELETE_USER" | "DELETE_POST" | "DELETE_COMMENT"

export type ActionCreator = {
  [K in ActionType]: (payload: any) => { type: K; payload: any };
};

// ==================== COMMAND PATTERN ====================

export type Command = "create" | "read" | "update" | "delete";
export type Resource = "user" | "post" | "comment";
export type Permission = `${Command}:${Resource}`;

// "create:user" | "read:user" | "update:user" | "delete:user" | ...

export function hasPermission(userPermissions: Permission[], required: Permission): boolean {
  return userPermissions.includes(required);
}

// ==================== EXAMPLES ====================

export const examples = {
  basic: {
    greeting: "hello world" as Greeting,
    email: "user@example.com" as Email,
  },
  intrinsic: {
    uppercase: "HELLO WORLD" as UppercaseGreeting,
    capitalize: "Alice" as CapitalizedName,
  },
  practical: {
    httpMethod: "GET" as UppercaseHTTPMethod,
    eventHandler: "onClick" as EventHandler,
    className: "dark-button" as ClassName,
  },
  advanced: {
    route: { userId: "123", postId: "456" } as Route2Params,
    query: "SELECT * FROM users" as Query,
  },
};

