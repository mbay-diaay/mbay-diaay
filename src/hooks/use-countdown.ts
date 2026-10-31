import { useEffect, useState } from "react";

/** Secondes restantes avant l'horodatage `until` (0 une fois atteint, ou si `until` est nul). */
export function useCountdown(until: number | null): number {
  const compute = () => (until ? Math.max(0, Math.ceil((until - Date.now()) / 1000)) : 0);
  const [left, setLeft] = useState(compute);
  useEffect(() => {
    setLeft(compute());
    if (!until) return;
    const t = setInterval(() => {
      const next = compute();
      setLeft(next);
      if (next === 0) clearInterval(t);
    }, 500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [until]);
  return left;
}
