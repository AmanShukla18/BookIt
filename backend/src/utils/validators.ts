export function isValidEmail(email: string): boolean {
  // Small, pragmatic regex; good enough for demo validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
