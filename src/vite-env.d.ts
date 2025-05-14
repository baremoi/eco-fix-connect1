
/// <reference types="vite/client" />

// This file extends TypeScript definitions for the project
// without modifying the read-only tsconfig files

declare module 'virtual:*' {
  const component: any;
  export default component;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.json' {
  const content: any;
  export default content;
}
