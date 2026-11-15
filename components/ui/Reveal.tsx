'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Scroll-driven animation engine:
// - [data-reveal]            single-element reveal (variants: up | fade | left | right | scale)
// - [data-reveal-group]      staggers its [data-reveal-item] children
// - [data-split]             masked word-by-word rise for headings (typography)
// - [data-line]              connector lines draw in from the left
// - [data-parallax="N"]      gentle scrubbed drift (±N% of element height)
// Everything is slow and soft by design; reduced-motion users get static content.
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reveal-done');
      return;
    }

    let ctx: gsap.Context | undefined;
    const splits: SplitText[] = [];
    let cancelled = false;

    const build = () => {
      ctx = gsap.context(() => {
        // Single-element reveals — slow fade/rise with soft easing.
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          const kind = el.dataset.reveal || 'up';
          const from: gsap.TweenVars =
            kind === 'fade'
              ? { opacity: 0 }
              : kind === 'left'
                ? { opacity: 0, x: -48 }
                : kind === 'right'
                  ? { opacity: 0, x: 48 }
                  : kind === 'scale'
                    ? { opacity: 0, scale: 0.93 }
                    : { opacity: 0, y: 36 };
          gsap.fromTo(el, from, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: Number(el.dataset.revealDelay ?? 0),
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          });
        });

        // Staggered groups (cards, rows, list items).
        gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
          const items = group.querySelectorAll('[data-reveal-item]');
          if (!items.length) return;
          gsap.fromTo(items, { opacity: 0, y: 36 }, {
            opacity: 1,
            y: 0,
            duration: 1.15,
            ease: 'power3.out',
            stagger: Number(group.dataset.revealStagger ?? 0.14),
            delay: Number(group.dataset.revealDelay ?? 0),
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          });
        });

        // Typography: headings rise word by word through overflow masks.
        gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
          const split = SplitText.create(el, { type: 'words', mask: 'words', aria: 'auto' });
          splits.push(split);
          el.classList.add('split-ready'); // unhide container now that words are masked
          gsap.fromTo(split.words, { yPercent: 120 }, {
            yPercent: 0,
            duration: 1.25,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });

        // Dotted connectors draw themselves in.
        gsap.utils.toArray<HTMLElement>('[data-line]').forEach((el) => {
          gsap.fromTo(el, { scaleX: 0 }, {
            scaleX: 1,
            duration: 1.5,
            ease: 'power2.inOut',
            transformOrigin: 'left center',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        });

        // Gentle scrubbed parallax (±N% of the element's own height).
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const amount = Number(el.dataset.parallax ?? 5);
          gsap.fromTo(el, { yPercent: -amount }, {
            yPercent: amount,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.4, // lag makes the drift feel heavy and slow
            },
          });
        });
      });
      ScrollTrigger.refresh();
    };

    // Split + measure only after fonts are ready so word masks never reflow mid-animation.
    const ready: Promise<unknown> =
      'fonts' in document && document.fonts?.ready ? document.fonts.ready : Promise.resolve();
    ready
      .then(() => {
        if (cancelled) return;
        try {
          build();
        } catch {
          // Never leave content hidden if animation setup fails.
          splits.forEach((s) => s.revert());
          document.documentElement.classList.add('reveal-done');
        }
      })
      .catch(() => document.documentElement.classList.add('reveal-done'));

    return () => {
      cancelled = true;
      splits.forEach((s) => s.revert());
      ctx?.revert();
    };
  }, []);

  return null;
}
