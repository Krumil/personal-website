"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface Disc {
    x: number;
    y: number;
    w: number;
    h: number;
    p: number;
}

interface Point {
    x: number;
    y: number;
}

interface Particle {
    x: number;
    sx: number;
    dx: number;
    y: number;
    vy: number;
    p: number;
    r: number;
    c: string;
}

interface ParticleArea {
    sw: number;
    ew: number;
    h: number;
    sx: number;
    ex: number;
}

interface ClipData {
    disc: Disc;
    i: number;
    path: Path2D;
}

interface CanvasOffset {
    x: number;
    y: number;
}

interface RenderData {
    width: number;
    height: number;
    dpi: number;
}

interface ComponentState {
    discs: Disc[];
    lines: Point[][];
    particles: Particle[];
    clip: Partial<ClipData>;
    startDisc: Disc;
    endDisc: Disc;
    rect: { width: number; height: number };
    render: RenderData;
    particleArea: ParticleArea;
    linesCanvas: HTMLCanvasElement | null;
    canvasOffset: CanvasOffset;
}

type HoleBackgroundProps = React.ComponentProps<"div"> & {
    strokeColor?: string;
    numberOfLines?: number;
    numberOfDiscs?: number;
    particleRGBColor?: [number, number, number];
};

function HoleBackground({
    strokeColor = "#737373",
    numberOfLines = 50,
    numberOfDiscs = 50,
    particleRGBColor = [255, 255, 255],
    className,
    children,
    ...props
}: HoleBackgroundProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const animationFrameIdRef = React.useRef<number>(0);
    const stateRef = React.useRef<ComponentState>({
        discs: [],
        lines: [],
        particles: [],
        clip: {},
        startDisc: { x: 0, y: 0, w: 0, h: 0, p: 0 },
        endDisc: { x: 0, y: 0, w: 0, h: 0, p: 0 },
        rect: { width: 0, height: 0 },
        render: { width: 0, height: 0, dpi: 1 },
        particleArea: { sw: 0, ew: 0, h: 0, sx: 0, ex: 0 },
        linesCanvas: null,
        canvasOffset: { x: 0, y: 0 },
    });

    // Target aspect ratio for consistent visual proportions (16:9 desktop ratio)
    const TARGET_ASPECT_RATIO = 16 / 9;

    const linear = (p: number) => p;
    const easeInExpo = (p: number) => (p === 0 ? 0 : Math.pow(2, 10 * (p - 1)));

    const tweenValue = React.useCallback((start: number, end: number, p: number, ease: "inExpo" | null = null) => {
        const delta = end - start;
        const easeFn = ease === "inExpo" ? easeInExpo : linear;
        return start + delta * easeFn(p);
    }, []);

    const tweenDisc = React.useCallback(
        (disc: Disc) => {
            const { startDisc, endDisc } = stateRef.current;
            disc.x = tweenValue(startDisc.x, endDisc.x, disc.p);
            disc.y = tweenValue(startDisc.y, endDisc.y, disc.p, "inExpo");
            disc.w = tweenValue(startDisc.w, endDisc.w, disc.p);
            disc.h = tweenValue(startDisc.h, endDisc.h, disc.p);
        },
        [tweenValue]
    );

    const setSize = React.useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const container = canvas.parentElement;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        // Detect if we're on mobile (width < 768px is a common mobile breakpoint)
        const isMobile = containerWidth < 768;

        let canvasWidth, canvasHeight, offsetX, offsetY;

        if (isMobile) {
            // Mobile: Fill height with fixed aspect ratio
            canvasHeight = containerHeight;
            canvasWidth = canvasHeight * TARGET_ASPECT_RATIO;
            offsetX = (containerWidth - canvasWidth) / 2;
            offsetY = 0;
        } else {
            // Desktop: Cover entire screen (fill both width and height)
            canvasWidth = containerWidth;
            canvasHeight = containerHeight;
            offsetX = 0;
            offsetY = 0;
        }

        stateRef.current.rect = { width: canvasWidth, height: canvasHeight };
        stateRef.current.render = {
            width: canvasWidth,
            height: canvasHeight,
            dpi: window.devicePixelRatio || 1,
        };
        stateRef.current.canvasOffset = { x: offsetX, y: offsetY };

        canvas.width = stateRef.current.render.width * stateRef.current.render.dpi;
        canvas.height = stateRef.current.render.height * stateRef.current.render.dpi;

        // Position the canvas
        canvas.style.left = `${offsetX}px`;
        canvas.style.top = `${offsetY}px`;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;
    }, [TARGET_ASPECT_RATIO]);

    const setDiscs = React.useCallback(() => {
        const { width, height } = stateRef.current.rect;
        stateRef.current.discs = [];
        stateRef.current.startDisc = {
            x: width * 0.5,
            y: height * 0.45,
            w: width * 0.75,
            h: height * 0.7,
            p: 0,
        };
        stateRef.current.endDisc = {
            x: width * 0.5,
            y: height * 0.95,
            w: 0,
            h: 0,
            p: 1,
        };
        let prevBottom = height;
        stateRef.current.clip = {};
        for (let i = 0; i < numberOfDiscs; i++) {
            const p = i / numberOfDiscs;
            const disc = { p, x: 0, y: 0, w: 0, h: 0 };
            tweenDisc(disc);
            const bottom = disc.y + disc.h;
            if (bottom <= prevBottom) {
                stateRef.current.clip = { disc: { ...disc }, i };
            }
            prevBottom = bottom;
            stateRef.current.discs.push(disc);
        }
        const clipPath = new Path2D();
        const disc = stateRef.current.clip.disc;
        if (disc) {
            clipPath.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2);
            clipPath.rect(disc.x - disc.w, 0, disc.w * 2, disc.y);
        }
        stateRef.current.clip.path = clipPath;
    }, [numberOfDiscs, tweenDisc]);

    const setLines = React.useCallback(() => {
        const { width, height } = stateRef.current.rect;
        stateRef.current.lines = [];
        const linesAngle = (Math.PI * 2) / numberOfLines;
        for (let i = 0; i < numberOfLines; i++) {
            stateRef.current.lines.push([]);
        }
        stateRef.current.discs.forEach((disc: Disc) => {
            for (let i = 0; i < numberOfLines; i++) {
                const angle = i * linesAngle;
                const p = {
                    x: disc.x + Math.cos(angle) * disc.w,
                    y: disc.y + Math.sin(angle) * disc.h,
                };
                stateRef.current.lines[i].push(p);
            }
        });
        const offCanvas = document.createElement("canvas");
        offCanvas.width = width;
        offCanvas.height = height;
        const ctx = offCanvas.getContext("2d");
        if (!ctx) return;
        stateRef.current.lines.forEach((line: Point[]) => {
            ctx.save();
            let lineIsIn = false;
            line.forEach((p1: Point, j: number) => {
                if (j === 0) return;
                const p0 = line[j - 1];
                const clipPath = stateRef.current.clip.path;
                if (clipPath) {
                    if (
                        !lineIsIn &&
                        (ctx.isPointInPath(clipPath, p1.x, p1.y) || ctx.isPointInStroke(clipPath, p1.x, p1.y))
                    ) {
                        lineIsIn = true;
                    } else if (lineIsIn) {
                        ctx.clip(clipPath);
                    }
                }
                ctx.beginPath();
                ctx.moveTo(p0.x, p0.y);
                ctx.lineTo(p1.x, p1.y);
                ctx.strokeStyle = strokeColor;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.closePath();
            });
            ctx.restore();
        });
        stateRef.current.linesCanvas = offCanvas;
    }, [numberOfLines, strokeColor]);

    const initParticle = React.useCallback(
        (start: boolean = false) => {
            const particleArea = stateRef.current.particleArea;
            const sx = particleArea.sx + particleArea.sw * Math.random();
            const ex = particleArea.ex + particleArea.ew * Math.random();
            const dx = ex - sx;
            const y = start ? particleArea.h * Math.random() : particleArea.h;
            const r = 0.5 + Math.random() * 4;
            const vy = 0.5 + Math.random();
            return {
                x: sx,
                sx,
                dx,
                y,
                vy,
                p: 0,
                r,
                c: `rgba(${particleRGBColor[0]}, ${particleRGBColor[1]}, ${particleRGBColor[2]}, ${Math.random()})`,
            };
        },
        [particleRGBColor]
    );

    const setParticles = React.useCallback(() => {
        const { width, height } = stateRef.current.rect;
        stateRef.current.particles = [];
        const disc = stateRef.current.clip.disc;
        if (disc) {
            stateRef.current.particleArea = {
                sw: disc.w * 0.5,
                ew: disc.w * 2,
                h: height * 0.85,
                sx: (width - disc.w * 0.5) / 2,
                ex: (width - disc.w * 2) / 2,
            };
            const totalParticles = 100;
            for (let i = 0; i < totalParticles; i++) {
                stateRef.current.particles.push(initParticle(true));
            }
        }
    }, [initParticle]);

    const drawDiscs = React.useCallback(
        (ctx: CanvasRenderingContext2D) => {
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 2;
            const outerDisc = stateRef.current.startDisc;
            ctx.beginPath();
            ctx.ellipse(outerDisc.x, outerDisc.y, outerDisc.w, outerDisc.h, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            stateRef.current.discs.forEach((disc: Disc, i: number) => {
                if (i % 5 !== 0) return;
                const clipDisc = stateRef.current.clip.disc;
                if (clipDisc && disc.w < clipDisc.w - 5) {
                    ctx.save();
                    const clipPath = stateRef.current.clip.path;
                    if (clipPath) {
                        ctx.clip(clipPath);
                    }
                }
                ctx.beginPath();
                ctx.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.closePath();
                if (clipDisc && disc.w < clipDisc.w - 5) {
                    ctx.restore();
                }
            });
        },
        [strokeColor]
    );

    const drawLines = React.useCallback((ctx: CanvasRenderingContext2D) => {
        if (stateRef.current.linesCanvas) {
            ctx.drawImage(stateRef.current.linesCanvas, 0, 0);
        }
    }, []);

    const drawParticles = React.useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.save();
        const clipPath = stateRef.current.clip.path;
        if (clipPath) {
            ctx.clip(clipPath);
        }
        stateRef.current.particles.forEach((particle: Particle) => {
            ctx.fillStyle = particle.c;
            ctx.beginPath();
            ctx.rect(particle.x, particle.y, particle.r, particle.r);
            ctx.closePath();
            ctx.fill();
        });
        ctx.restore();
    }, []);

    const moveDiscs = React.useCallback(() => {
        stateRef.current.discs.forEach((disc: Disc) => {
            disc.p = (disc.p + 0.001) % 1;
            tweenDisc(disc);
        });
    }, [tweenDisc]);

    const moveParticles = React.useCallback(() => {
        stateRef.current.particles.forEach((particle: Particle, idx: number) => {
            particle.p = 1 - particle.y / stateRef.current.particleArea.h;
            particle.x = particle.sx + particle.dx * particle.p;
            particle.y -= particle.vy;
            if (particle.y < 0) {
                stateRef.current.particles[idx] = initParticle();
            }
        });
    }, [initParticle]);

    const tick = React.useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(stateRef.current.render.dpi, stateRef.current.render.dpi);
        moveDiscs();
        moveParticles();
        drawDiscs(ctx);
        drawLines(ctx);
        drawParticles(ctx);
        ctx.restore();
        animationFrameIdRef.current = requestAnimationFrame(tick);
    }, [moveDiscs, moveParticles, drawDiscs, drawLines, drawParticles]);

    const init = React.useCallback(() => {
        setSize();
        setDiscs();
        setLines();
        setParticles();
    }, [setSize, setDiscs, setLines, setParticles]);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        init();
        tick();
        const handleResize = () => {
            setSize();
            setDiscs();
            setLines();
            setParticles();
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameIdRef.current);
        };
    }, [init, tick, setSize, setDiscs, setLines, setParticles]);

    return (
        <div
            data-slot="hole-background"
            className={cn(
                "relative size-full overflow-hidden",
                'before:content-[""] before:absolute before:top-1/2 before:left-1/2 before:block before:size-[140%] dark:before:[background:radial-gradient(ellipse_at_50%_55%,transparent_10%,black_50%)] before:[background:radial-gradient(ellipse_at_50%_55%,transparent_10%,white_50%)] before:[transform:translate3d(-50%,-50%,0)]',
                'after:content-[""] after:absolute after:z-[5] after:top-1/2 after:left-1/2 after:block after:size-full after:[background:radial-gradient(ellipse_at_50%_75%,#f2612e_20%,transparent_75%)] after:[transform:translate3d(-50%,-50%,0)] after:mix-blend-overlay',
                className
            )}
            {...props}
        >
            {children}
            <canvas ref={canvasRef} className="absolute block dark:opacity-20 opacity-10" />
            <div className="absolute top-0 left-0 z-[7] size-full dark:[background:repeating-linear-gradient(transparent,transparent_1px,white_1px,white_2px)] mix-blend-overlay opacity-50" />
        </div>
    );
}

export { HoleBackground, type HoleBackgroundProps };
