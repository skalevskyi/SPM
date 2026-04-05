'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

import type { PackageId } from '@/lib/calculator/types';

const focusRing =
  'focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400/70 dark:focus-visible:ring-slate-500/70';

const SWIPE_THRESHOLD_PX = 48;

/**
 * Soft radial stage: center open/readable, edges slightly deeper — same logic in light/dark,
 * tuned per theme (atmospheric, not a flat block).
 */
const stageSurfaceClass =
  'relative touch-pan-y select-none rounded-xl p-2 sm:p-3 ' +
  'bg-[radial-gradient(ellipse_80%_76%_at_50%_51%,rgb(255_255_255)_0%,rgb(248_250_252)_32%,rgb(226_232_240)_100%)] ' +
  'dark:bg-[radial-gradient(ellipse_80%_76%_at_50%_50%,rgb(71_85_105/0.42)_0%,rgb(51_65_85/0.32)_44%,rgb(15_23_42)_100%)]';

type OffreLightboxProps = {
  isOpen: boolean;
  onClose: (finalIndex: number) => void;
  packageId: PackageId;
  images: readonly string[];
  initialIndex: number;
  alt: string;
  openerRef: React.RefObject<HTMLButtonElement | null>;
  labelClose: string;
  imageCarouselLabel: string;
  imageCarouselImage: string;
  reducedMotion: boolean;
};

export function OffreLightbox({
  isOpen,
  onClose,
  packageId,
  images,
  initialIndex,
  alt,
  openerRef,
  labelClose,
  imageCarouselLabel,
  imageCarouselImage,
  reducedMotion,
}: OffreLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(initialIndex);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointerStartX = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    setIndex(initialIndex);
  }, [isOpen, initialIndex]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const handleClose = useCallback(() => {
    onClose(index);
    requestAnimationFrame(() => openerRef.current?.focus());
  }, [index, onClose, openerRef]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose, goPrev, goNext]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
  }, [isOpen]);

  const releaseCaptureIfNeeded = (el: HTMLElement, pointerId: number) => {
    if (el.hasPointerCapture(pointerId)) {
      el.releasePointerCapture(pointerId);
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointerStartX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    releaseCaptureIfNeeded(el, e.pointerId);
    if (pointerStartX.current == null) return;
    const dx = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    releaseCaptureIfNeeded(el, e.pointerId);
    pointerStartX.current = null;
  };

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="offre-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[100]"
          initial={{ opacity: reducedMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reducedMotion ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/[0.22] backdrop-blur-md dark:bg-black/[0.26]"
            aria-hidden
            onClick={handleClose}
          />
          <div className="relative flex min-h-full items-center justify-center p-4 sm:p-6 pointer-events-none">
            <div
              className="pointer-events-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/[0.08] ring-1 ring-slate-900/[0.04] dark:border-slate-600/50 dark:bg-slate-900 dark:shadow-xl dark:shadow-black/25 dark:ring-white/[0.06]"
            >
              <header className="mb-3 flex w-full items-center justify-between gap-4 border-b border-slate-200 pb-3 dark:border-slate-600/55">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-800 dark:text-slate-300">
                  {packageId}
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  aria-label={labelClose}
                  onClick={handleClose}
                  title={labelClose}
                  className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition-colors hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-600/90 dark:bg-slate-800 dark:text-slate-100 dark:shadow-none dark:hover:border-slate-500 dark:hover:bg-slate-700 dark:hover:text-white ${focusRing}`}
                >
                  <X className="h-4 w-4 opacity-90" strokeWidth={2} aria-hidden />
                </button>
              </header>

              <div
                className={stageSurfaceClass}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerCancel}
              >
                <div className="relative mx-auto h-[min(52vh,560px)] w-full max-w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: reducedMotion ? 1 : 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: reducedMotion ? 1 : 0 }}
                      transition={{ duration: reducedMotion ? 0 : 0.28 }}
                    >
                      <Image
                        src={images[index]}
                        alt={alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 896px) 100vw, 896px"
                        priority
                        draggable={false}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {images.length > 1 ? (
                <div
                  className="mt-4 flex min-h-[44px] items-center justify-center gap-3 border-t border-slate-200 pt-3 dark:border-slate-600/50"
                  role="tablist"
                  aria-label={imageCarouselLabel}
                >
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-label={`${imageCarouselImage} ${i + 1}`}
                      aria-selected={index === i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIndex(i);
                      }}
                      className={`flex min-h-11 min-w-11 items-center justify-center rounded-full transition-all duration-200 ease-out ${focusRing}`}
                    >
                      <span
                        className={`block rounded-full transition-all duration-200 ease-out ${
                          index === i
                            ? 'h-3 w-10 bg-slate-800 shadow-sm dark:bg-slate-200 dark:shadow-black/25'
                            : 'h-3 w-3 bg-slate-400 hover:bg-slate-500 dark:bg-slate-500 dark:hover:bg-slate-400'
                        }`}
                        aria-hidden
                      />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
