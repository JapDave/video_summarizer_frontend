export const loadGoogleScript = () => {
  return new Promise((resolve, reject) => {
    if (document.getElementById("google-api")) {
      resolve(); // If the script is already added, resolve immediately
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.id = "google-api"; // Give the script an ID to prevent duplicates
      script.async = true;
      script.defer = true;
      script.onload = resolve; // Resolve the promise when the script loads
      script.onerror = reject; // Reject the promise if script loading fails
      document.body.appendChild(script); // Append the script to the document
    }
  });
};
