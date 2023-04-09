export const copyToClipboard = async (text: string, onAfter?: () => void) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  } finally {
    onAfter?.();
  }
};

export default {
  copyToClipboard,
};
