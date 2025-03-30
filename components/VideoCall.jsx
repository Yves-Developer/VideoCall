// components/JitsiVideoCall.js
import React, { useEffect } from "react";

const VideoCall = ({ roomName }) => {
  useEffect(() => {
    // Ensure that we load the Jitsi API on the client side only
    if (typeof window !== "undefined" && !window.JitsiMeetExternalAPI) {
      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js"; // Jitsi API URL
      script.async = true;
      script.onload = () => {
        initializeJitsi(roomName); // Initialize Jitsi when the script is loaded
      };
      document.body.appendChild(script);
    } else {
      // If the script is already loaded (e.g., cached), initialize Jitsi directly
      initializeJitsi(roomName);
    }

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

  const initializeJitsi = (roomName) => {
    const domain = "meet.jit.si"; // You can replace this with your own Jitsi server
    const options = {
      roomName: roomName,
      width: "100%",
      height: "100%",
      parentNode: document.getElementById("jitsi-container"),
      configOverwrite: { startWithAudioMuted: true },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: ["microphone", "camera", "hangup"],
      },
    };

    new window.JitsiMeetExternalAPI(domain, options);
  };

  return (
    <div id="jitsi-container" className="w-full h-full">
      {/* The Jitsi meeting will be embedded here */}
    </div>
  );
};
export default VideoCall;
