'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';

type Placement = 'top' | 'top-right';

export type InfoIconTooltipProps = {
  content: string;
  placement?: Placement;
  /** Delay before show on hover (ms) */
  hoverDelayMs?: number;
  /** Delay before hide after pointer leaves (bridges gap to tooltip) */
  hoverLeaveDelayMs?: number;
  /** Wrapper (e.g. inside a button — use tight spacing) */
  className?: string;
  /** Remove default ml-1 on the icon trigger */
  noLeadingMargin?: boolean;
  /** Extra classes on the icon button (e.g. on filled pills) */
  triggerClassName?: string;
};

/**
 * Info (ⓘ) with tooltip: hover on fine-pointer devices; tap toggles on touch; click outside / Escape closes.
 */
export function InfoIconTooltip({
  content,
  placement = 'top-right',
  hoverDelayMs = 160,
  hoverLeaveDelayMs = 120,
  className = '',
  noLeadingMargin = false,
  triggerClassName = '',
}: InfoIconTooltipProps) {
  const id = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [canHover, setCanHover] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)');
    const apply = () => setCanHover(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const clearShowTimer = useCallback(() => {
    if (showTimerRef.current !== null) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
  }, []);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current !== null) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const show = pinned || focused || (canHover && hovered);

  useEffect(() => {
    if (!pinned) return;
    const close = (e: PointerEvent) => {
      const el = wrapRef.current;
      if (el && !el.contains(e.target as Node)) {
        setPinned(false);
      }
    };
    document.addEventListener('pointerdown', close, true);
    return () => document.removeEventListener('pointerdown', close, true);
  }, [pinned]);

  useEffect(() => {
    if (!pinned && !focused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPinned(false);
        setFocused(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [pinned, focused]);

  const scheduleShow = () => {
    clearShowTimer();
    clearHideTimer();
    showTimerRef.current = setTimeout(() => setHovered(true), hoverDelayMs);
  };

  const scheduleHide = () => {
    clearShowTimer();
    clearHideTimer();
    hideTimerRef.current = setTimeout(() => setHovered(false), hoverLeaveDelayMs);
  };

  const handleWrapEnter = () => {
    if (!canHover) return;
    scheduleShow();
  };

  const handleWrapLeave = () => {
    if (!canHover) return;
    clearShowTimer();
    scheduleHide();
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    if (canHover) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    setPinned((p) => !p);
  };

  const placementClass =
    placement === 'top-right'
      ? 'bottom-full right-0 mb-1.5'
      : 'bottom-full left-1/2 mb-1.5 -translate-x-1/2';

  return (
    <span
      ref={wrapRef}
      className={`relative inline-flex items-center align-middle ${className}`}
      onMouseEnter={handleWrapEnter}
      onMouseLeave={handleWrapLeave}
    >
      <button
        type="button"
        aria-label={content}
        aria-expanded={show}
        aria-describedby={show ? id : undefined}
        className={`inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-400 transition-colors hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/80 dark:text-slate-400 dark:hover:text-slate-200 ${noLeadingMargin ? '' : 'ml-1'} ${triggerClassName}`}
        onClick={handleButtonClick}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <span className="select-none text-[13px] leading-none" aria-hidden>
          ⓘ
        </span>
      </button>
      {show ? (
        <span
          id={id}
          role="tooltip"
          className={`absolute z-[80] block ${placementClass} max-w-[240px] rounded-lg border border-white/10 bg-zinc-950 px-2.5 py-2 text-left text-xs font-normal leading-relaxed text-slate-100 shadow-xl ring-1 ring-black/20 dark:border-white/10 dark:bg-zinc-950 dark:text-slate-100 dark:shadow-2xl dark:ring-white/10`}
        >
          {content}
        </span>
      ) : null}
    </span>
  );
}
