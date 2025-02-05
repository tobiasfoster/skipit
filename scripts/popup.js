function initializePopup() {
  const services = ['netflix', 'disney', 'amazon'];
  services.forEach(service => {
      const checkbox = document.getElementById(service);
      chrome.storage.sync.get([service], (result) => {
          checkbox.checked = result[service] ?? true;
      });

      checkbox.addEventListener('change', (e) => {
          chrome.storage.sync.set({ [service]: checkbox.checked }, () => {
              console.log(`${service} is set to ${checkbox.checked}`);
          });
      });
  });
}

// Initialize the popup when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePopup);
