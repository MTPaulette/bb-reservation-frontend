'use client';

export default function Calendar({
  filters
}: {
  filters: { period: string, activePeriod: React.ReactNode }
}) {
  return (
    <h1> vue calendaire period: {filters.period}   activePeriod: {filters.activePeriod} </h1>
  );
};