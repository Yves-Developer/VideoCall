"use client";
import React, { useState } from "react";
import VideoCall from "@/components/VideoCall";

const Home = () => {
  const [roomName, setRoomName] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoinRoom = () => {
    if (roomName.trim()) {
      setJoined(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl mb-6">Jitsi Video Call</h1>

      {!joined ? (
        <div className="flex flex-col items-center space-y-4">
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter Room Name"
            className="px-4 py-2 rounded bg-gray-700 text-white"
          />
          <button
            onClick={handleJoinRoom}
            className="px-6 py-3 rounded bg-blue-500 hover:bg-blue-600 transition"
          >
            Join Room
          </button>
        </div>
      ) : (
        <VideoCall roomName={roomName} />
      )}
    </div>
  );
};

export default Home;
