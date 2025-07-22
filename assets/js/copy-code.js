document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre').forEach((pre) => {
    const button = document.createElement('button');
    button.className = 'copy-code-button';
    button.textContent = 'Copy';
    pre.appendChild(button);

    button.addEventListener('click', () => {
      const code = pre.querySelector('code').innerText;
      navigator.clipboard.writeText(code).then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  });
});
