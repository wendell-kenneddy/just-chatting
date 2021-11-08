export function sanitizeText(text: string) {
  return text.trim().replace(/[!%&+*@()#$.[\]]/gi, '');
}
