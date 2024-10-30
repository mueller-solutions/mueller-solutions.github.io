export function handleBlurEvent(event: FocusEvent) {
  const el = event.target as HTMLInputElement;

  if (!el.value) {
    el.dataset.hasError = 'true';
    const displayName = el.parentElement?.querySelector('.label')?.innerHTML;
    showError(el, `${displayName} is required.`);
  }
}

export function handleFocusEvent(event: FocusEvent) {
  const el = event.target as HTMLInputElement;

  if (el.dataset.hasError) {
    hideError(el);
    el.dataset.hasError = 'false';
  }
}

export function showError(el: HTMLInputElement, errorMessage: string) {
  el.parentElement?.classList.add('form-control-error');
  const errorEl = document.createElement('span');
  errorEl.classList.add('error-message');
  errorEl.textContent = errorMessage;
  el.parentElement?.appendChild(errorEl);
}

export function hideError(el: HTMLInputElement) {
  el.parentElement?.classList.remove('form-control-error');
  el.parentElement?.querySelector('.error-message')?.remove();
}
