import React from 'react';

export interface Options<T> {
  targetRef: React.RefObject<T>;
  /**
   * Callback function invoked once the targetRef's element intersects
   * either the device's viewport or a specified element (value of rootRef)
   */
  onIntersect: () => void;
  /**
   * The ref of the element that is used as the viewport
   * for checking visibility of the target.
   * Must be the ancestor of the targetRef. Defaults to the browser viewport
   * if not specified or if ref is null.
   */
  rootRef?: React.RefObject<any>;
  /**
   * Margin around the root. Can have values similar to the CSS margin property,
   * e.g. "10px 20px 30px 40px" (top, right, bottom, left).
   * The values can be percentages. This set of values serves to grow
   * or shrink each side of the root element's bounding box before computing intersections.
   * Defaults to all zeros.
   */
  rootMargin?: string;
  /**
   * Either a single number or an array of numbers which indicate at what percentage of
   * the target's visibility the observer's callback should be executed.
   * If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5.
   * If you want the callback to run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1].
   * The default is 0 (meaning as soon as even one pixel is visible, the callback will be run).
   * A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.
   */
  threshold?: number | number[];
  enabled?: boolean;
}

export default function useIntersectionObserver<
  T extends HTMLElement = HTMLDivElement
>({
  targetRef,
  onIntersect,
  rootRef,
  threshold = 0.0,
  rootMargin = '1.0px',
  enabled = true,
}: Options<T>) {
  React.useEffect(() => {
    const el = targetRef?.current;

    if (!enabled || !el) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onIntersect(),
      {
        root: rootRef?.current,
        rootMargin,
        threshold,
      }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [targetRef, enabled, rootRef, rootMargin, threshold, onIntersect]);
}
