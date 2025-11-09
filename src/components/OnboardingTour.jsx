import React, { useEffect, useMemo, useRef, useState } from 'react';

/*
  Simple one-time guided tour. Highlights elements with data attributes:
  data-tour="logo", data-tour="form", data-tour="stats", data-tour="table"
  Appears once per browser (localStorage key: bssm_tour_seen)
*/
export default function OnboardingTour({ enabled = true, steps, onFinish }) {
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState(null);
  const activeStep = steps[index];

  const updateRect = () => {
    if (!activeStep) return;
    const el = document.querySelector(`[data-tour="${activeStep.target}"]`);
    if (!el) return;
    const r = el.getBoundingClientRect();
    setRect({ top: r.top + window.scrollY, left: r.left + window.scrollX, width: r.width, height: r.height });
  };

  useEffect(() => {
    if (!enabled) return;
    updateRect();
    const onScroll = () => updateRect();
    const onResize = () => updateRect();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [enabled, index]);

  useEffect(() => {
    if (!enabled) return;
    // Ensure highlighted element is visible
    const el = document.querySelector(`[data-tour="${activeStep?.target}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Lock body scroll so header/logo doesn't jump around
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [enabled, activeStep]);

  if (!enabled || !activeStep || !rect) return null;

  const next = () => {
    if (index < steps.length - 1) setIndex((i) => i + 1);
    else {
      localStorage.setItem('bssm_tour_seen', '1');
      onFinish?.();
    }
  };

  const prev = () => setIndex((i) => Math.max(0, i - 1));

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Highlight box */}
      <div
        className="absolute rounded-xl ring-4 ring-emerald-400/80 bg-transparent"
        style={{ top: rect.top - 8, left: rect.left - 8, width: rect.width + 16, height: rect.height + 16 }}
      />

      {/* Tooltip */}
      <div
        className="absolute max-w-sm rounded-xl bg-white p-4 shadow-xl ring-1 ring-emerald-200"
        style={{ top: rect.top + rect.height + 16, left: rect.left }}
      >
        <p className="text-sm text-emerald-900">{activeStep.title}</p>
        <p className="mt-1 text-sm text-gray-600">{activeStep.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <button onClick={prev} className="rounded-md px-3 py-1.5 text-sm text-emerald-700 hover:bg-emerald-50 disabled:opacity-50" disabled={index === 0}>Sebelumnya</button>
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">{index + 1}/{steps.length}</div>
            <button onClick={next} className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm text-white hover:bg-emerald-700">
              {index === steps.length - 1 ? 'Selesai' : 'Lanjut'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
