describe("Checkout Purchase Calculation Logic", () => {
  const applyCoupon = (total: number, couponCode: string) => {
    if (couponCode === "SHAHARIAR20") return total * 0.8;
    if (couponCode === "PROMO50") return total * 0.5;
    return total;
  };

  it("should apply promo codes correctly", () => {
    expect(applyCoupon(100, "SHAHARIAR20")).toBe(80);
    expect(applyCoupon(100, "PROMO50")).toBe(50);
    expect(applyCoupon(100, "INVALID")).toBe(100);
  });
});
