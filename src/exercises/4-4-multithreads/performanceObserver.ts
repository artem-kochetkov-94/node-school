import perf_hooks from "perf_hooks";

export const performanceObserver = new perf_hooks.PerformanceObserver(
  (items) => {
    items.getEntries().forEach((entry) => {
      console.log(`${entry?.name}: ${entry?.duration}`);
    });
  }
);
