describe("Learning Progress Computation", () => {
  const computeProgressPercent = (completed: number, total: number) => {
    if (total <= 0) return 0;
    return Math.min(100, Math.round((completed / total) * 100));
  };

  it("should calculate correct percentage of completed lectures", () => {
    expect(computeProgressPercent(5, 10)).toBe(50);
    expect(computeProgressPercent(10, 10)).toBe(100);
    expect(computeProgressPercent(0, 10)).toBe(0);
  });
});
