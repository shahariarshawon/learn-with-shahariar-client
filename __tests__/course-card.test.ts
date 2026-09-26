describe("Course Card Business Logic", () => {
  const calculateFinalPrice = (price: number, discountPercentage: number) => {
    if (discountPercentage <= 0) return price;
    const discounted = price - (price * discountPercentage) / 100;
    return Math.max(0, Math.round(discounted * 100) / 100);
  };

  it("should correctly compute discounted course price", () => {
    expect(calculateFinalPrice(100, 20)).toBe(80);
    expect(calculateFinalPrice(49.99, 10)).toBe(44.99);
    expect(calculateFinalPrice(150, 0)).toBe(150);
  });
});
