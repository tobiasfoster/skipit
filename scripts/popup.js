function initializePopup() {
  const services = ['netflix', 'disney', 'amazon'];
  services.forEach(service => {
      const checkbox = document.getElementById(service);
      // Retrieve the stored state for each service
      chrome.storage.sync.get([service], (result) => {
          checkbox.checked = result[service] ?? true;
      });

      // Add event listener to handle changes
      checkbox.addEventListener('change', (e) => {
        // Update storage when the checkbox state changes
          chrome.storage.sync.set({ [service]: checkbox.checked }, () => {
              console.log(`${service} is set to ${checkbox.checked}`);
          });
      });
  });
}

// Initialize the popup when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePopup);