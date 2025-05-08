
// utils/notif.js
export function notif(message = '', duration = 1000, bc) {
    // Create container if not exists
    let container = document.querySelector('#notif-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notif-container';
  
      Object.assign(container.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '9999',
        display: 'flex',
        flexDirection: 'column-reverse', // Stack new notifications above
        gap: '10px',
        pointerEvents: 'none',
      });
  
      document.body.appendChild(container);
    }
  
    // Create notification box
    const box = document.createElement('div');
    box.textContent = message;
  
    Object.assign(box.style, {
      background: bc,
      color: '#fff',
      padding: '16px 32px',
      borderRadius: '8px',
      fontSize: '14px',
      minWidth: '200px',
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      opacity: '0',
      transform: 'translateX(20px)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      pointerEvents: 'auto',
    });
  
    container.appendChild(box);
  
    // Animate in
    requestAnimationFrame(() => {
      box.style.opacity = '1';
      box.style.transform = 'translateX(0)';
    });
  
    // Auto-remove after duration
    setTimeout(() => {
      box.style.opacity = '0';
      box.style.transform = 'translateX(20px)';
      setTimeout(() => {
        if (box.parentNode) {
          box.parentNode.removeChild(box);
        }
        // Remove container if empty
        if (container.children.length === 0 && container.parentNode) {
          container.parentNode.removeChild(container);
        }
      }, 1000);
    }, duration);
  }
  