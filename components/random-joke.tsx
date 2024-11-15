"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";

interface JokeResponse {
  setup: string;
  punchline: string;
}

function RandomJoke() {

  const [joke, setJoke] = useState<string>("")

  useEffect(() => {
    fetchJoke();
  }, []);

  async function fetchJoke(): Promise<void> {
    try {
      const res = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      )
      const data: JokeResponse = await res.json()
      setJoke(`${data.setup} - ${data.punchline}`)
    } catch (err) {
      console.log("Error Error fetching joke:", err);
      setJoke("Failed to fetch joke. Please try again!")
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-gray-400 p-4">
        <div className="bg-gradient-to-tl from-gray-600 to-gray-400 rounded-xl shadow-xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">😂 Random Joke 👈</h1>
          <div className="bg-[#f5f5f5] rounded-lg p-6 mb-6 text-[#555] text-lg">
            {joke || "Loading..."}
          </div>
          <Button
            onClick={fetchJoke}
            className="bg-[#4caf50] hover:bg-[#43a047] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          >
            😂 Get New Joke 😂
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RandomJoke