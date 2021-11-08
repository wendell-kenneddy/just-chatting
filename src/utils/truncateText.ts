export function truncateText(text: string, cap: number) {
  if (text.length > cap) {
    return text.substring(0, cap - 3) + '...';
  }
}
