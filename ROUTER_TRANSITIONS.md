# Router Transitions with Next.js App Router

This guide explains how to implement smooth router transitions in your Next.js App Router application using multiple approaches.

## 🎯 **Available Transition Methods**

### 1. **Template-based Transitions (Recommended)**
**File**: `src/app/template.tsx`

```tsx
"use client";
import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
            {children}
        </motion.div>
    );
}
```

**Pros:**
- ✅ Automatic transitions for all routes
- ✅ Works reliably with App Router
- ✅ No additional setup required per page

**Cons:**
- ❌ Same transition for all routes
- ❌ Less control over individual page transitions

### 2. **Enhanced TransitionWrapper Component**
**File**: `src/components/TransitionWrapper.tsx`

```tsx
"use client";
import { AnimatePresence, motion, Variants } from "motion/react";
import { usePathname } from "next/navigation";

// Different transitions based on route
const getRouteTransition = (pathname: string): Variants => {
    if (pathname === "/") {
        return {
            initial: { opacity: 0, scale: 0.95, y: 40 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 1.05, y: -40 }
        };
    }
    // More route-specific transitions...
};

export default function TransitionWrapper({ children }) {
    const pathname = usePathname();
    const variants = getRouteTransition(pathname);

    return (
        <AnimatePresence mode="wait">
            <motion.div key={pathname} variants={variants}>
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
```

**Pros:**
- ✅ Route-specific transitions
- ✅ Full control over animation timing
- ✅ Can wrap individual pages or entire app

**Cons:**
- ❌ Requires manual wrapping of components
- ❌ More complex setup

### 3. **TransitionLink Component**
**File**: `src/components/TransitionLink.tsx`

```tsx
"use client";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export function TransitionLink({ href, children, ...props }) {
    const router = useRouter();
    
    const handleClick = async (e) => {
        e.preventDefault();
        await new Promise(resolve => setTimeout(resolve, 100)); // Exit animation time
        router.push(href);
    };

    return (
        <motion.a 
            href={href} 
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {children}
        </motion.a>
    );
}
```

**Usage:**
```tsx
<TransitionLink href="/ai" className="nav-link">
    AI Projects
</TransitionLink>
```

**Pros:**
- ✅ Drop-in replacement for regular links
- ✅ Built-in hover/tap animations
- ✅ Handles transition timing automatically

### 4. **useRouterTransition Hook**
**File**: `src/hooks/useRouterTransition.ts`

```tsx
"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function useRouterTransition() {
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);
    const [isPending, startTransition] = useTransition();

    const navigate = async (href: string) => {
        setIsNavigating(true);
        await new Promise(resolve => setTimeout(resolve, 150)); // Exit animation
        startTransition(() => router.push(href));
        setTimeout(() => setIsNavigating(false), 300);
    };

    return { navigate, isNavigating: isNavigating || isPending };
}
```

**Usage:**
```tsx
function MyComponent() {
    const { navigate, isNavigating } = useRouterTransition();
    
    return (
        <button 
            onClick={() => navigate("/blockchain")}
            disabled={isNavigating}
            style={{ opacity: isNavigating ? 0.7 : 1 }}
        >
            {isNavigating ? "Loading..." : "Go to Blockchain"}
        </button>
    );
}
```

**Pros:**
- ✅ Full programmatic control
- ✅ Loading states included
- ✅ Works with React 18+ concurrent features

### 5. **View Transitions API (Modern Browsers)**
**File**: `src/components/ViewTransition.tsx`

```tsx
"use client";
import { useRouter } from "next/navigation";

export function TransitionLink({ href, children, ...props }) {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        
        if ("startViewTransition" in document) {
            document.startViewTransition(() => router.push(href));
        } else {
            router.push(href); // Fallback
        }
    };

    return <a href={href} onClick={handleClick} {...props}>{children}</a>;
}
```

**CSS** (in `globals.css`):
```css
@view-transition {
  navigation: auto;
}

::view-transition-old(root) {
  animation: slide-out-left 0.3s ease-in-out;
}

::view-transition-new(root) {
  animation: slide-in-right 0.3s ease-in-out;
}
```

**Pros:**
- ✅ Native browser performance
- ✅ Automatic fallback to regular navigation
- ✅ Future-proof

**Cons:**
- ❌ Limited browser support (Chrome 111+)
- ❌ Less control over animations

## 🚀 **Implementation Strategy**

### **Recommended Approach:**
1. **Use `template.tsx`** for basic automatic transitions
2. **Add `TransitionWrapper`** for route-specific animations
3. **Use `TransitionLink`** for enhanced navigation links
4. **Add View Transitions API** for progressive enhancement

### **File Structure:**
```
src/
├── app/
│   ├── template.tsx          # Automatic transitions
│   └── layout.tsx           # Root layout
├── components/
│   ├── TransitionWrapper.tsx # Route-specific transitions
│   ├── TransitionLink.tsx   # Enhanced links
│   └── ViewTransition.tsx   # Modern browser support
├── hooks/
│   └── useRouterTransition.ts # Programmatic navigation
└── styles/
    └── globals.css          # View Transitions CSS
```

## 🎨 **Transition Examples**

### **Home Page → Project Page:**
```tsx
// Slide in from right with scale
initial: { opacity: 0, x: 100, scale: 0.95 }
animate: { opacity: 1, x: 0, scale: 1 }
exit: { opacity: 0, x: -100, scale: 1.05 }
```

### **Project Page → Home:**
```tsx
// Fade with vertical movement
initial: { opacity: 0, y: 40 }
animate: { opacity: 1, y: 0 }
exit: { opacity: 0, y: -40 }
```

### **Loading States:**
```tsx
// Skeleton or spinner during transition
{isNavigating && <LoadingSpinner />}
```

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **Transitions not working:**
   - Ensure `"use client"` directive is present
   - Check that `motion/react` is properly imported
   - Verify `AnimatePresence` has `mode="wait"`

2. **Flickering during transitions:**
   - Add `willChange: "transform, opacity"` to motion elements
   - Use `key={pathname}` for proper component remounting

3. **Performance issues:**
   - Limit concurrent animations
   - Use `transform3d(0,0,0)` for hardware acceleration
   - Debounce rapid navigation attempts

### **Browser Support:**
- **Motion transitions:** All modern browsers
- **View Transitions API:** Chrome 111+, Safari (upcoming)
- **Fallback:** Regular navigation without transitions

## 📱 **Mobile Considerations**

```tsx
// Reduced motion for mobile/accessibility
const prefersReducedMotion = useReducedMotion();

const transition = prefersReducedMotion 
    ? { duration: 0.1 }
    : { type: "spring", stiffness: 260, damping: 20 };
```

## 🎯 **Best Practices**

1. **Keep transitions short** (200-400ms)
2. **Use consistent easing** across the app
3. **Provide loading feedback** for slow transitions
4. **Respect user preferences** (reduced motion)
5. **Test on mobile devices** for performance
6. **Fallback gracefully** when animations fail

This setup provides smooth, professional router transitions that enhance user experience while maintaining good performance and accessibility.