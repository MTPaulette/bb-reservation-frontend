'use client';

export default function Calendar({
  period, activePeriod
}: {
  period: string, activePeriod: React.ReactNode
}) {
  return (
    <h1> vue calendaire {period} {activePeriod} </h1>
  );
};