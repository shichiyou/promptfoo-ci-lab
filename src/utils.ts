/**
 * テスト補助ユーティリティ
 */
export function assertContains(haystack: string, needle: string): boolean {
  return haystack.includes(needle);
}

export function buildPrompt(template: string, vars: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`{{${key}}}`, "g"), value);
  }
  return result;
}
