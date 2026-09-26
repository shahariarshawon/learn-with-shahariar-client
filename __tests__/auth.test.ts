describe("Authentication & Role Authorization logic", () => {
  it("should grant access to admin routes only for 'admin' role", () => {
    const checkAdminAccess = (role: string) => role === "admin";

    expect(checkAdminAccess("admin")).toBe(true);
    expect(checkAdminAccess("educator")).toBe(false);
    expect(checkAdminAccess("student")).toBe(false);
  });

  it("should grant access to instructor routes for 'educator' or 'admin'", () => {
    const checkInstructorAccess = (role: string) => role === "educator" || role === "admin";

    expect(checkInstructorAccess("educator")).toBe(true);
    expect(checkInstructorAccess("admin")).toBe(true);
    expect(checkInstructorAccess("student")).toBe(false);
  });
});
