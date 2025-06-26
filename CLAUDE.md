# CLAUDE.md - Personal Website Project

**Always refer to @.claude/DEVELOPMENT_GUIDELINES.md for guidelines**

## Project Overview

This is a personal portfolio website built with Next.js 15.3.3, React 19, and TypeScript. The site showcases different project categories including AI, blockchain, and full-stack development projects with modern UI components and animations.

## Tech Stack

### Core Framework

-   **Next.js 15.3.3** with App Router
-   **React 19** with React Compiler (babel-plugin-react-compiler)
-   **TypeScript** (strict mode enabled)
-   **Tailwind CSS 4.1.8** for styling

### UI & Animation Libraries

-   **Framer Motion 12.17.3** & **Motion 12.18.1** - Advanced animations
-   **GSAP 3.13.0** - Timeline animations
-   **Three.js 0.177.0** - 3D graphics and effects
-   **Lucide React** - Icon library
-   **Radix UI** - Accessible component primitives

### Development Tools

-   **ESLint** with Next.js config
-   **PostCSS** with Autoprefixer
-   **Turbopack** for fast development builds

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── ai/                # AI projects showcase
│   ├── blockchain/        # Blockchain projects showcase
│   ├── fullstack/         # Full-stack projects showcase
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # UI component library
│   ├── MiniNavbar.tsx    # Compact navigation
│   ├── PortfolioNavbar.tsx # Main navigation
│   └── performance-*.tsx # Performance monitoring
└── lib/
    └── utils.ts          # Utility functions
```

## Key Features

### Performance Optimization

-   **Performance monitoring** components for tracking metrics
-   **Optimized images** with Next.js Image component
-   **Turbopack** for faster development builds
-   Custom font loading with Supreme and Technor font families

### Advanced UI Components

-   **Animated grid patterns** with optimized rendering
-   **Glass card effects** with backdrop blur
-   **Hero sections** with motion animations
-   **Bento grid layouts** for project showcases
-   **Hyper text effects** and speed animations

### Navigation

-   **Portfolio navbar** with smooth transitions
-   **Mini navbar** for compact layouts
-   **Responsive design** across all viewports

## Development Commands

```bash
# Development with Turbopack (fastest)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## TypeScript Configuration

-   **Strict mode enabled** - Full type safety enforcement
-   **ES2017 target** with modern browser support
-   **Path aliases** configured (`@/*` → `./src/*`)
-   **Next.js plugin** for optimal TypeScript integration

## Testing Approach

**Note**: Currently no test framework is configured. Following TDD guidelines from DEVELOPMENT_GUIDELINES.md:

### Recommended Testing Setup

-   **Jest** or **Vitest** for testing framework
-   **React Testing Library** for component testing
-   **MSW** for API mocking when needed
-   **100% coverage** through behavior-driven testing

### Test Organization Pattern

```
src/
  features/
    portfolio/
      portfolio-display.ts
      portfolio-validator.ts
      portfolio-display.test.ts  # Tests behavior, not implementation
```

## Development Guidelines

This project follows strict development principles outlined in `.claude/DEVELOPMENT_GUIDELINES.md`:

### Core Principles

-   **Test-Driven Development (TDD)** - Write tests first, always
-   **TypeScript strict mode** - No `any` types or type assertions
-   **Functional programming** - Immutable data, pure functions
-   **Behavior-driven testing** - Test public APIs, not implementation
-   **Schema-first development** with Zod for type safety

### Code Style

-   **No comments** - Self-documenting code through clear naming
-   **Options objects** for function parameters
-   **Early returns** over nested conditionals
-   **Small, focused functions** with single responsibility

### Workflow

1. **Red** - Write failing test
2. **Green** - Minimal code to pass test
3. **Refactor** - Improve code structure if beneficial
4. **Commit** - Each working change

## Current State

### Completed Features

-   Modern Next.js 15 setup with React 19
-   Component library with animated UI elements
-   Performance monitoring integration
-   Multi-page portfolio structure (AI, Blockchain, Full-stack)
-   Responsive navigation components

### Areas for Improvement

-   **Add comprehensive testing suite** following TDD guidelines
-   **Implement Zod schemas** for type-safe data validation
-   **Add error boundaries** for better error handling
-   **Configure performance monitoring** dashboards
-   **Add accessibility testing** and ARIA improvements

## Notes for Claude

When working on this project:

1. **Always follow TDD** - No production code without failing tests first
2. **Respect TypeScript strict mode** - No shortcuts with types
3. **Maintain existing patterns** - Follow established component structure
4. **Consider performance** - This is a showcase site, performance matters
5. **Test user-visible behavior** - Focus on what users experience, not implementation details

## Project Context

This appears to be a personal portfolio website showcasing development skills across different domains. The site emphasizes modern web technologies, smooth animations, and professional presentation of projects. The tech stack choices reflect current industry best practices with cutting-edge tools like React 19, Next.js 15, and advanced animation libraries.
