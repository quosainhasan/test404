/**
 * INDIAN SHIA MUSLIM WEDDING INVITATION - INTERACTION SCRIPT
 * Faiza Jafri Weds Mohd. Hilal Mehdi | October 31, 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const envelopeOverlay = document.getElementById('envelopeOverlay');
  const openInvitationTrigger = document.getElementById('openInvitationTrigger');
  const timerGrid = {
    days: document.getElementById('daysCount'),
    hours: document.getElementById('hoursCount'),
    minutes: document.getElementById('minutesCount'),
    seconds: document.getElementById('secondsCount')
  };

  const calModal = document.getElementById('calendarModal');
  const addToCalBtn = document.getElementById('addToCalBtn');
  const navCalBtn = document.getElementById('navCalBtn');
  const closeCalModal = document.getElementById('closeCalModal');
  const googleCalLink = document.getElementById('googleCalLink');
  const downloadIcsBtn = document.getElementById('downloadIcsBtn');

  const navShareBtn = document.getElementById('navShareBtn');
  const toastNotification = document.getElementById('toastNotification');

  /* --------------------------------------------------------------------------
     1. ENVELOPE OPENING INTERACTION
     -------------------------------------------------------------------------- */
  function openEnvelope() {
    if (!envelopeOverlay) return;
    envelopeOverlay.classList.add('envelope-opened');
    
    // Accessibility update
    envelopeOverlay.setAttribute('aria-hidden', 'true');

    // Show welcoming toast
    showToast('Khushamdeed! You are warmly welcomed.');

    // Auto-focus main container
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
    }
  }

  if (openInvitationTrigger) {
    openInvitationTrigger.addEventListener('click', openEnvelope);
    openInvitationTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelope();
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. COUNTDOWN TIMER TO OCTOBER 31, 2026 (7:00 PM IST)
     -------------------------------------------------------------------------- */
  // Date: 31st October 2026, 19:00:00 IST (UTC+05:30)
  const WEDDING_TIMESTAMP = new Date('2026-10-31T19:00:00+05:30').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = WEDDING_TIMESTAMP - now;

    if (difference <= 0) {
      if (timerGrid.days) timerGrid.days.textContent = '00';
      if (timerGrid.hours) timerGrid.hours.textContent = '00';
      if (timerGrid.minutes) timerGrid.minutes.textContent = '00';
      if (timerGrid.seconds) timerGrid.seconds.textContent = '00';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60));
    const minutes = Math.floor((difference % (1000 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (timerGrid.days) timerGrid.days.textContent = String(days).padStart(2, '0');
    if (timerGrid.hours) timerGrid.hours.textContent = String(hours).padStart(2, '0');
    if (timerGrid.minutes) timerGrid.minutes.textContent = String(minutes).padStart(2, '0');
    if (timerGrid.seconds) timerGrid.seconds.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* --------------------------------------------------------------------------
     3. CALENDAR SAVE-THE-DATE INTEGRATION
     -------------------------------------------------------------------------- */
  const eventDetails = {
    title: 'Faiza Jafri Weds Mohd. Hilal Mehdi - Wedding Ceremony',
    description: 'Auspicious Wedding Ceremony of Faiza Jafri with Mohd. Hilal Mehdi.\\n\\nWith the blessings of Chaharda Masumeen (A.S.) & Imam-e-Zamana (A.T.F.S.)\\n\\nProgramme:\\n• 7:00 PM: Arrival of Barat\\n• 7:30 PM: Hadees-e-Kisa\\n• 8:00 PM: Nikah Ceremony\\n• 8:30 PM: Dinner\\n• Late Night: Rukhsati\\n\\nHost: Mrs. & Mr. Syed Vasi Raza Jafri (Mob: +91 6396317716)\\nR.S.V.P.: Tuba and Mantasha\\nW.B.C.F.: Jafri Family and Rizvi Family',
    location: 'Mahalakshmi Palace (Wedding Point), Ajabpur Kalan, Doon University Road near Bengali Kothi Chowk, Dehradun, Uttarakhand',
    // 2026-10-31 19:00 IST = 20261031T133000Z
    // End: 2026-11-01 01:00 IST = 20261031T193000Z
    startIso: '20261031T133000Z',
    endIso: '20261031T193000Z'
  };

  // Google Calendar URL
  if (googleCalLink) {
    const gCalUrl = new URL('https://calendar.google.com/calendar/render');
    gCalUrl.searchParams.set('action', 'TEMPLATE');
    gCalUrl.searchParams.set('text', eventDetails.title);
    gCalUrl.searchParams.set('dates', `${eventDetails.startIso}/${eventDetails.endIso}`);
    gCalUrl.searchParams.set('details', eventDetails.description.replace(/\\n/g, '\n'));
    gCalUrl.searchParams.set('location', eventDetails.location);
    googleCalLink.href = gCalUrl.toString();
  }

  // Apple / Outlook .ics download
  if (downloadIcsBtn) {
    downloadIcsBtn.addEventListener('click', () => {
      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Faiza and Hilal Wedding//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `SUMMARY:${eventDetails.title}`,
        `DESCRIPTION:${eventDetails.description}`,
        `LOCATION:${eventDetails.location}`,
        `DTSTART:${eventDetails.startIso}`,
        `DTEND:${eventDetails.endIso}`,
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Faiza-Hilal-Wedding.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast('Calendar event downloaded!');
      if (calModal && calModal.open) calModal.close();
    });
  }

  function openCalModal() {
    if (calModal) {
      if (typeof calModal.showModal === 'function') {
        calModal.showModal();
      } else {
        calModal.setAttribute('open', '');
      }
    }
  }

  function closeCalendarModal() {
    if (calModal) {
      if (typeof calModal.close === 'function') {
        calModal.close();
      } else {
        calModal.removeAttribute('open');
      }
    }
  }

  if (addToCalBtn) addToCalBtn.addEventListener('click', openCalModal);
  if (navCalBtn) navCalBtn.addEventListener('click', openCalModal);
  if (closeCalModal) closeCalModal.addEventListener('click', closeCalendarModal);
  if (calModal) {
    calModal.addEventListener('click', (e) => {
      const rect = calModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) closeCalendarModal();
    });
  }

  /* --------------------------------------------------------------------------
     4. NATIVE MOBILE SHARE API
     -------------------------------------------------------------------------- */
  if (navShareBtn) {
    navShareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Wedding Invitation | Faiza Jafri Weds Mohd. Hilal Mehdi',
        text: 'Mrs. Rabab Rizvi & Mr. Syed Vasi Raza Jafri cordially invite you to the wedding ceremony of Faiza Jafri & Mohd. Hilal Mehdi on Saturday, October 31st, 2026 in Dehradun.',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          showToast('Invitation shared successfully!');
        } catch (err) {
          // User cancelled or share dismissed
        }
      } else {
        // Fallback: Copy link
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Invitation link copied to clipboard!');
          }).catch(() => {
            fallbackCopy(window.location.href);
          });
        } else {
          fallbackCopy(window.location.href);
        }
      }
    });
  }

  function fallbackCopy(text) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      showToast('Invitation link copied!');
    } catch (e) {
      showToast('Could not copy link');
    }
    document.body.removeChild(input);
  }

  /* --------------------------------------------------------------------------
     5. TOAST NOTIFICATION UTILITY
     -------------------------------------------------------------------------- */
  let toastTimer = null;
  function showToast(msg) {
    if (!toastNotification) return;
    toastNotification.textContent = msg;
    toastNotification.classList.add('toast-visible');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('toast-visible');
    }, 3200);
  }

  // Smooth scroll helper for bottom bar anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});
