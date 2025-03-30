// components/JitsiVideoCall.js
import React, { useEffect } from "react";

const VideoCall = ({ roomName }) => {
  useEffect(() => {
    const loadJitsiScript = () => {
      if (typeof window !== "undefined" && !window.JitsiMeetExternalAPI) {
        const script = document.createElement("script");
        script.src = "https://meet.jit.si/external_api.js"; // Jitsi API URL
        script.async = true;
        script.onload = () => {
          initializeJitsi(roomName); // Initialize Jitsi when the script is loaded
        };
        script.onerror = () => {
          console.error("Error loading Jitsi Meet API.");
        };
        document.body.appendChild(script);
      } else {
        // If the script is already loaded (e.g., cached), initialize Jitsi directly
        initializeJitsi(roomName);
      }
    };

    const initializeJitsi = (roomName) => {
      const domain = "meet.jit.si"; // Use the public Jitsi server (or you can use your own)
      const options = {
        roomName: roomName,
        width: "100%",
        height: "100%",
        parentNode: document.getElementById("jitsi-container"),
        configOverwrite: {
          startWithAudioMuted: true,
          startWithVideoMuted: false, // Adjust as per your requirement
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: ["microphone", "camera", "hangup"],
          DEFAULT_BACKGROUND: "#1c1f2b", // Set default background color
        },
      };

      if (typeof window.JitsiMeetExternalAPI !== "undefined") {
        const api = new window.JitsiMeetExternalAPI(domain, options);

        // Ensure there's no authentication or moderation
        api.executeCommand("subject", "Live Video Call"); // You can set a subject/title for the room
        api.executeCommand("displayName", "Guest"); // Set a display name if needed
      } else {
        console.error("JitsiMeetExternalAPI not found.");
      }
    };

    loadJitsiScript(); // Load the script and initialize Jitsi when ready

    // Cleanup the script when the component is unmounted
    return () => {
      const script = document.querySelector(
        `script[src="https://meet.jit.si/external_api.js"]`
      );
      if (script) {
        script.remove();
      }
    };
  }, [roomName]);

  return (
    <div id="jitsi-container" className="w-full h-full">
      {/* The Jitsi meeting will be embedded here */}
    </div>
  );
};

export default VideoCall;
