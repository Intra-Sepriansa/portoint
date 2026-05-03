import { Mesh, Program, Renderer, Texture, Triangle } from 'ogl';
import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';

type ShaderRevealProps = {
    frontImage: string;
    backImage: string;
    alt: string;
    className?: string;
    style?: CSSProperties;
    mouseForce?: number;
    cursorSize?: number;
    resolution?: number;
    revealStrength?: number;
    revealSoftness?: number;
    backImageScale?: number;
    backImageTranslateX?: number;
    backImageTranslateY?: number;
    autoDemo?: boolean;
    autoSpeed?: number;
    autoIntensity?: number;
    autoResumeDelay?: number;
};

const vertex = `#version 300 es
in vec2 position;

void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;

uniform sampler2D tFront;
uniform sampler2D tBack;
uniform sampler2D tMask;
uniform vec2 uResolution;
uniform vec2 uFrontSize;
uniform vec2 uBackSize;
uniform vec3 uBackTransform;
uniform float uTime;
uniform float uRevealStrength;
uniform float uRevealSoftness;

out vec4 fragColor;

vec2 coverUv(vec2 uv, vec2 imageSize) {
    float imageAspect = imageSize.x / imageSize.y;
    float planeAspect = uResolution.x / uResolution.y;
    vec2 scale = vec2(1.0);

    if (planeAspect > imageAspect) {
        scale.y = imageAspect / planeAspect;
    } else {
        scale.x = planeAspect / imageAspect;
    }

    return (uv - 0.5) * scale + 0.5;
}

vec2 alignUv(vec2 uv, vec3 transform) {
    return ((uv - transform.xy) - 0.5) / max(transform.z, 0.01) + 0.5;
}

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
    );
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 4; i++) {
        value += noise(p) * amplitude;
        p *= 2.04;
        amplitude *= 0.5;
    }

    return value;
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    float mask = texture(tMask, uv).r;
    float ripple = fbm(uv * 8.0 + vec2(uTime * 0.35, -uTime * 0.22));
    float edgeNoise = (ripple - 0.5) * 0.18;
    float softness = max(0.015, uRevealSoftness * 0.16);
    float reveal = smoothstep(0.08, 0.08 + softness, mask * uRevealStrength + edgeNoise);
    vec2 frontUv = coverUv(uv, uFrontSize);
    vec2 backUv = coverUv(alignUv(uv, uBackTransform), uBackSize);
    vec4 front = texture(tFront, frontUv);
    vec4 back = texture(tBack, backUv);
    vec4 color = mix(front, back, reveal);

    float rim = smoothstep(0.12, 0.55, mask) - smoothstep(0.55, 0.9, mask);
    color.rgb += rim * vec3(0.34, 0.14, 0.08);
    color.a = max(front.a * (1.0 - reveal), back.a * reveal);

    fragColor = color;
}
`;

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

function createPlaceholderCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = 1;
    canvas.height = 1;

    if (context) {
        context.fillStyle = '#000';
        context.fillRect(0, 0, 1, 1);
    }

    return canvas;
}

export function ShaderReveal({
    frontImage,
    backImage,
    alt,
    className = '',
    style,
    mouseForce = 50,
    cursorSize = 250,
    resolution = 0.5,
    revealStrength = 0.75,
    revealSoftness = 1,
    backImageScale = 1,
    backImageTranslateX = 0,
    backImageTranslateY = 0,
    autoDemo = true,
    autoSpeed = 0.55,
    autoIntensity = 2.2,
    autoResumeDelay = 1200,
}: ShaderRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sourceKey = `${frontImage}|${backImage}`;
    const [readyKey, setReadyKey] = useState<string | null>(null);
    const [errorKey, setErrorKey] = useState<string | null>(null);
    const isReady = readyKey === sourceKey;
    const hasWebglError = errorKey === sourceKey;

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        let renderer: Renderer;
        let isMounted = true;

        try {
            renderer = new Renderer({
                webgl: 2,
                alpha: true,
                antialias: true,
                dpr: Math.min(window.devicePixelRatio || 1, 2),
            });
        } catch {
            const timeout = window.setTimeout(() => {
                if (isMounted) {
                    setErrorKey(sourceKey);
                }
            }, 0);

            return () => {
                isMounted = false;
                window.clearTimeout(timeout);
            };
        }

        let loadedImages = 0;
        let animationFrame = 0;
        const gl = renderer.gl;
        const canvas = gl.canvas;
        const maskCanvas = document.createElement('canvas');
        const maskContext = maskCanvas.getContext('2d', { alpha: false });
        const frontSize = new Float32Array([1024, 1536]);
        const backSize = new Float32Array([1024, 1536]);

        if (!maskContext) {
            const timeout = window.setTimeout(() => {
                if (isMounted) {
                    setErrorKey(sourceKey);
                }
            }, 0);
            canvas.remove();

            return () => {
                isMounted = false;
                window.clearTimeout(timeout);
            };
        }

        Object.assign(canvas.style, {
            display: 'block',
            height: '100%',
            inset: '0',
            opacity: '0',
            position: 'absolute',
            transition: 'opacity 400ms ease',
            width: '100%',
        });

        container.appendChild(canvas);

        const placeholder = createPlaceholderCanvas();
        const textureOptions = {
            image: placeholder,
            generateMipmaps: false,
            minFilter: gl.LINEAR,
            magFilter: gl.LINEAR,
            wrapS: gl.CLAMP_TO_EDGE,
            wrapT: gl.CLAMP_TO_EDGE,
        };
        const frontTexture = new Texture(gl, textureOptions);
        const backTexture = new Texture(gl, textureOptions);
        const maskTexture = new Texture(gl, {
            ...textureOptions,
            image: maskCanvas,
        });
        const geometry = new Triangle(gl);
        const program = new Program(gl, {
            vertex,
            fragment,
            transparent: true,
            depthTest: false,
            depthWrite: false,
            uniforms: {
                tFront: { value: frontTexture },
                tBack: { value: backTexture },
                tMask: { value: maskTexture },
                uResolution: { value: new Float32Array([1, 1]) },
                uFrontSize: { value: frontSize },
                uBackSize: { value: backSize },
                uBackTransform: {
                    value: new Float32Array([
                        backImageTranslateX,
                        backImageTranslateY,
                        backImageScale,
                    ]),
                },
                uTime: { value: 0 },
                uRevealStrength: { value: revealStrength },
                uRevealSoftness: { value: revealSoftness },
            },
        });
        const mesh = new Mesh(gl, { geometry, program });
        const pointer = {
            x: 0.5,
            y: 0.48,
            active: false,
            hasPosition: false,
            lastInteraction: 0,
        };
        let previousX = 0.5;
        let previousY = 0.48;
        let lastMode: 'auto' | 'pointer' = 'auto';

        const drawBrush = (
            normalizedX: number,
            normalizedY: number,
            force: number,
        ) => {
            const width = maskCanvas.width;
            const height = maskCanvas.height;

            if (width <= 1 || height <= 1) {
                return;
            }

            const x = normalizedX * width;
            const y = normalizedY * height;
            const radius = Math.max(18, cursorSize * resolution);
            const alpha = clamp(0.34 + force * 0.52, 0.2, 0.95);
            const gradient = maskContext.createRadialGradient(
                x,
                y,
                0,
                x,
                y,
                radius,
            );

            gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
            gradient.addColorStop(0.36, `rgba(255,255,255,${alpha * 0.72})`);
            gradient.addColorStop(0.72, `rgba(255,255,255,${alpha * 0.18})`);
            gradient.addColorStop(1, 'rgba(255,255,255,0)');

            maskContext.globalCompositeOperation = 'lighter';
            maskContext.fillStyle = gradient;
            maskContext.beginPath();
            maskContext.arc(x, y, radius, 0, Math.PI * 2);
            maskContext.fill();
        };

        const setMaskSize = () => {
            const rect = container.getBoundingClientRect();
            const maskWidth = Math.max(
                1,
                Math.floor(rect.width * clamp(resolution, 0.25, 1)),
            );
            const maskHeight = Math.max(
                1,
                Math.floor(rect.height * clamp(resolution, 0.25, 1)),
            );

            maskCanvas.width = maskWidth;
            maskCanvas.height = maskHeight;
            maskContext.globalCompositeOperation = 'source-over';
            maskContext.fillStyle = '#000';
            maskContext.fillRect(0, 0, maskWidth, maskHeight);
            maskTexture.needsUpdate = true;
        };

        const setSize = () => {
            const rect = container.getBoundingClientRect();
            const width = Math.max(1, Math.floor(rect.width));
            const height = Math.max(1, Math.floor(rect.height));

            renderer.setSize(width, height);

            const renderResolution = program.uniforms.uResolution
                .value as Float32Array;
            renderResolution[0] = gl.drawingBufferWidth;
            renderResolution[1] = gl.drawingBufferHeight;
            setMaskSize();
            renderer.render({ scene: mesh });
        };

        const markImageLoaded = () => {
            loadedImages += 1;

            if (loadedImages === 2 && isMounted) {
                setReadyKey(sourceKey);
                canvas.style.opacity = '1';
            }
        };

        const loadTexture = (
            src: string,
            texture: Texture,
            size: Float32Array,
        ): HTMLImageElement => {
            const image = new Image();

            image.onload = () => {
                size[0] = image.naturalWidth || 1024;
                size[1] = image.naturalHeight || 1536;
                texture.image = image;
                texture.needsUpdate = true;
                markImageLoaded();
            };
            image.onerror = () => {
                if (isMounted) {
                    setErrorKey(sourceKey);
                }
            };
            image.src = src;

            return image;
        };

        const frontImageElement = loadTexture(
            frontImage,
            frontTexture,
            frontSize,
        );
        const backImageElement = loadTexture(backImage, backTexture, backSize);

        const updatePointer = (event: PointerEvent) => {
            const rect = container.getBoundingClientRect();

            pointer.x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
            pointer.y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
            pointer.active = true;
            pointer.hasPosition = true;
            pointer.lastInteraction = performance.now();
        };

        const releasePointer = () => {
            pointer.active = false;
        };

        container.addEventListener('pointerdown', updatePointer, {
            passive: true,
        });
        container.addEventListener('pointermove', updatePointer, {
            passive: true,
        });
        container.addEventListener('pointerup', releasePointer);
        container.addEventListener('pointerleave', releasePointer);
        container.addEventListener('pointercancel', releasePointer);

        const resizeObserver = new ResizeObserver(setSize);
        resizeObserver.observe(container);
        setSize();

        const startTime = performance.now();
        const render = (time: number) => {
            const elapsed = (time - startTime) * 0.001;
            const idleTime = time - pointer.lastInteraction;
            const usePointer =
                pointer.hasPosition &&
                (pointer.active || idleTime < autoResumeDelay);
            const mode = usePointer ? 'pointer' : 'auto';
            const waveTime = elapsed * autoSpeed;
            const x = usePointer
                ? pointer.x
                : 0.5 + Math.sin(waveTime * 1.08) * 0.21;
            const y = usePointer
                ? pointer.y
                : 0.5 + Math.cos(waveTime * 1.37) * 0.24;

            if (mode !== lastMode) {
                previousX = x;
                previousY = y;
                lastMode = mode;
            }

            maskContext.globalCompositeOperation = 'source-over';
            maskContext.fillStyle = 'rgba(0,0,0,0.035)';
            maskContext.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

            if (autoDemo || usePointer) {
                const distance = Math.hypot(x - previousX, y - previousY);
                const force =
                    clamp(distance * mouseForce, 0.15, 1) *
                    (usePointer ? 1 : autoIntensity);
                const steps = Math.min(
                    8,
                    Math.max(
                        1,
                        Math.ceil(
                            distance *
                                Math.max(maskCanvas.width, maskCanvas.height) *
                                0.18,
                        ),
                    ),
                );

                for (let index = 1; index <= steps; index += 1) {
                    const progress = index / steps;
                    drawBrush(
                        previousX + (x - previousX) * progress,
                        previousY + (y - previousY) * progress,
                        force,
                    );
                }
            }

            previousX = x;
            previousY = y;
            maskTexture.needsUpdate = true;
            program.uniforms.uTime.value = elapsed;
            renderer.render({ scene: mesh });
            animationFrame = requestAnimationFrame(render);
        };

        animationFrame = requestAnimationFrame(render);

        return () => {
            isMounted = false;
            cancelAnimationFrame(animationFrame);
            resizeObserver.disconnect();
            container.removeEventListener('pointerdown', updatePointer);
            container.removeEventListener('pointermove', updatePointer);
            container.removeEventListener('pointerup', releasePointer);
            container.removeEventListener('pointerleave', releasePointer);
            container.removeEventListener('pointercancel', releasePointer);
            frontImageElement.onload = null;
            frontImageElement.onerror = null;
            backImageElement.onload = null;
            backImageElement.onerror = null;
            canvas.remove();
        };
    }, [
        frontImage,
        backImage,
        mouseForce,
        cursorSize,
        resolution,
        revealStrength,
        revealSoftness,
        backImageScale,
        backImageTranslateX,
        backImageTranslateY,
        autoDemo,
        autoSpeed,
        autoIntensity,
        autoResumeDelay,
        sourceKey,
    ]);

    return (
        <div
            ref={containerRef}
            role="img"
            aria-label={alt}
            className={`relative isolate overflow-hidden ${className}`.trim()}
            style={{ touchAction: 'pan-y', ...style }}
        >
            <img
                src={frontImage}
                alt=""
                aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                    isReady && !hasWebglError ? 'opacity-0' : 'opacity-100'
                }`}
                draggable={false}
            />
        </div>
    );
}
