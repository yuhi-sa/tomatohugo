class CodeCopyManager {
  constructor() {
    this.init();
  }
  
  init() {
    document.querySelectorAll('pre:has(code)').forEach(pre => {
      this.addCopyButton(pre);
    });
  }
  
  addCopyButton(pre) {
    const button = document.createElement('button');
    button.className = 'copy-code-button';
    button.innerHTML = `
      <i class="far fa-copy" aria-hidden="true"></i>
      <span class="copy-text">Copy</span>
    `;
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.setAttribute('title', 'Copy code');
    
    pre.style.position = 'relative';
    pre.appendChild(button);

    button.addEventListener('click', async () => {
      await this.copyCode(button, pre);
    });
  }
  
  async copyCode(button, pre) {
    const code = pre.querySelector('code');
    if (!code) return;
    
    const text = code.innerText || code.textContent;
    
    try {
      await navigator.clipboard.writeText(text);
      this.showSuccess(button);
    } catch (err) {
      console.warn('Clipboard API failed, trying fallback:', err);
      this.fallbackCopy(text, button);
    }
  }
  
  fallbackCopy(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showSuccess(button);
    } catch (err) {
      console.error('Failed to copy text:', err);
      this.showError(button);
    } finally {
      document.body.removeChild(textArea);
    }
  }
  
  showSuccess(button) {
    const icon = button.querySelector('i');
    const text = button.querySelector('.copy-text');
    
    icon.className = 'fas fa-check';
    text.textContent = 'Copied!';
    button.classList.add('copy-success');
    button.setAttribute('aria-label', 'Code copied to clipboard');
    
    setTimeout(() => {
      icon.className = 'far fa-copy';
      text.textContent = 'Copy';
      button.classList.remove('copy-success');
      button.setAttribute('aria-label', 'Copy code to clipboard');
    }, 2000);
  }
  
  showError(button) {
    const icon = button.querySelector('i');
    const text = button.querySelector('.copy-text');
    
    icon.className = 'fas fa-times';
    text.textContent = 'Failed';
    button.classList.add('copy-error');
    
    setTimeout(() => {
      icon.className = 'far fa-copy';
      text.textContent = 'Copy';
      button.classList.remove('copy-error');
    }, 2000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CodeCopyManager();
});
