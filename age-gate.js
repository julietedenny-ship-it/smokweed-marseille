(() => {
  const ageGate = document.getElementById('ageGate');
  if (!ageGate) return;

  const ageGateYes = document.getElementById('ageGateYes');
  const ageGateNo = document.getElementById('ageGateNo');
  const ageGateChoices = document.getElementById('ageGateChoices');
  const ageGateDenied = document.getElementById('ageGateDenied');
  if (!ageGateYes || !ageGateNo || !ageGateChoices || !ageGateDenied) {
    console.error('Age confirmation controls are missing from the page.');
    return;
  }

  const gatedContent = [
    document.getElementById('siteBanner'),
    document.querySelector('.topbar'),
    document.querySelector('main'),
    document.querySelector('.footer')
  ].filter(Boolean);
  const setAgeGateOpen = (isOpen) => {
    ageGate.hidden = !isOpen;
    document.body.classList.toggle('age-gate-open', isOpen);
    gatedContent.forEach((element) => {
      if (isOpen) element.setAttribute('inert', '');
      else element.removeAttribute('inert');
    });
  };

  let ageConfirmed = false;
  try {
    ageConfirmed = sessionStorage.getItem('smokweed.ageConfirmed') === '18';
  } catch (error) {
    console.warn('Age confirmation will not persist for this session.', error);
  }

  setAgeGateOpen(!ageConfirmed);
  if (ageConfirmed) {
    ageGate.remove();
    return;
  }

  ageGateYes.focus();
  ageGateYes.addEventListener('click', () => {
    try {
      sessionStorage.setItem('smokweed.ageConfirmed', '18');
    } catch (error) {
      console.warn('Age confirmation will not persist for this session.', error);
    }
    setAgeGateOpen(false);
  });

  ageGateNo.addEventListener('click', () => {
    ageGateChoices.hidden = true;
    ageGateDenied.hidden = false;
    ageGateDenied.tabIndex = -1;
    ageGateDenied.focus();
  });

  ageGate.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') event.preventDefault();

    if (event.key === 'Tab' && ageGateChoices.hidden) {
      event.preventDefault();
      ageGateDenied.focus();
    } else if (event.key === 'Tab') {
      const focusable = [ageGateYes, ageGateNo];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
