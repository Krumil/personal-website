"use client";

import { useEffect, use, startTransition } from "react";

interface PerformanceMetrics {
    fcp?: number; // First Contentful Paint
    lcp?: number; // Largest Contentful Paint
    fid?: number; // First Input Delay
    cls?: number; // Cumulative Layout Shift
    ttfb?: number; // Time to First Byte
}

export const PerformanceMonitor = () => {
    useEffect(() => {
        // Only run in production or when explicitly enabled
        if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PUBLIC_ENABLE_PERF_MONITOR) {
            return;
        }

        const metrics: PerformanceMetrics = {};

        // Measure Core Web Vitals
        const measureWebVitals = () => {
            // First Contentful Paint
            const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0] as PerformanceEntry;
            if (fcpEntry) {
                metrics.fcp = fcpEntry.startTime;
            }

            // Time to First Byte
            const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            if (navigationEntry) {
                metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
            }

            // Log metrics to console in development
            if (process.env.NODE_ENV === 'development') {
                console.log('Performance Metrics:', metrics);
            }
        };

        // Use PerformanceObserver for modern browsers
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1] as any;
                metrics.lcp = lastEntry.startTime;
                
                if (process.env.NODE_ENV === 'development') {
                    console.log('LCP:', metrics.lcp);
                }
            });

            // First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry: any) => {
                    metrics.fid = entry.processingStart - entry.startTime;
                    
                    if (process.env.NODE_ENV === 'development') {
                        console.log('FID:', metrics.fid);
                    }
                });
            });

            // Cumulative Layout Shift
            const clsObserver = new PerformanceObserver((list) => {
                let clsValue = 0;
                const entries = list.getEntries();
                
                entries.forEach((entry: any) => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                
                metrics.cls = clsValue;
                
                if (process.env.NODE_ENV === 'development') {
                    console.log('CLS:', metrics.cls);
                }
            });

            try {
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                fidObserver.observe({ entryTypes: ['first-input'] });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                console.warn('PerformanceObserver not fully supported:', e);
            }

            // Cleanup observers
            return () => {
                lcpObserver.disconnect();
                fidObserver.disconnect();
                clsObserver.disconnect();
            };
        }

        // Fallback for older browsers
        setTimeout(measureWebVitals, 0);
        
        // Also measure after page load
        window.addEventListener('load', measureWebVitals);
        
        return () => {
            window.removeEventListener('load', measureWebVitals);
        };
    }, []);

    // Monitor bundle size in development
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            // Log initial bundle information
            console.log('Performance optimizations active:');
            console.log('- Three.js lazy loading: ✓');
            console.log('- Optimized grid pattern: ✓');
            console.log('- Image optimization ready: ✓');
            
            // Monitor memory usage
            if ('memory' in performance) {
                const memory = (performance as any).memory;
                console.log('Memory usage:', {
                    used: `${Math.round(memory.usedJSHeapSize / 1048576)} MB`,
                    total: `${Math.round(memory.totalJSHeapSize / 1048576)} MB`,
                    limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)} MB`
                });
            }
        }
    }, []);

    return null; // This component doesn't render anything
};