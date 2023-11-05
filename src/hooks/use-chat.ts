import { fetchEventSource } from "@fortaine/fetch-event-source";
import { useState, useMemo } from "react";
import { appConfig } from "../../config.browser";

const API_PATH = "https://api.duhocsinh.se:8000/q";
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * A custom hook to handle the chat state and logic
 */
export function useChat() {
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [state, setState] = useState<"idle" | "waiting" | "loading">("idle");

  // Lets us cancel the stream
  const abortController = useMemo(() => new AbortController(), []);

  /**
   * Cancels the current chat and adds the current chat to the history
   */
  function cancel() {
    setState("idle");
    abortController.abort();
    if (currentChat) {
      const newHistory = [
        ...chatHistory,
        { role: "user", content: currentChat } as const,
      ];

      setChatHistory(newHistory);
      setCurrentChat("");
    }
  }

  /**
   * Clears the chat history
   */

  function clear() {
    console.log("clear");
    setChatHistory([]);
  }

  /**
   * Sends a new message to the AI function and streams the response
   */
  const sendMessage = (message: string, chatHistory: Array<ChatMessage>) => {
    setState("waiting");
    let chatContent = "";
    const newHistory = [
      ...chatHistory,
      { role: "user", content: message } as const,
    ];

    setChatHistory(newHistory);
    const body = JSON.stringify({
      // Only send the most recent messages. This is also
      // done in the serverless function, but we do it here
      // to avoid sending too much data
      messages: newHistory.slice(-appConfig.historyLength),
    });

    // This is like an EventSource, but allows things like
    // POST requests and headers
    /* fetchEventSource(API_PATH, {
      body,
      method: "POST",
      signal: abortController.signal,
      onclose: () => {
        setState("idle");
      },
      onmessage: (event) => {
        switch (event.event) {
          case "delta": {
            // This is a new word or chunk from the AI
            setState("loading");
            const message = JSON.parse(event.data);
            if (message?.role === "assistant") {
              chatContent = "";
              return;
            }
            if (message.content) {
              chatContent += message.content;
              setCurrentChat(chatContent);
            }
            break;
          }
          case "open": {
            // The stream has opened and we should recieve
            // a delta event soon. This is normally almost instant.
            setCurrentChat("...");
            break;
          }
          case "done": {
            // When it's done, we add the message to the history
            // and reset the current chat
            setChatHistory((curr) => [
              ...curr,
              { role: "assistant", content: chatContent } as const,
            ]);
            setCurrentChat(null);
            setState("idle");
          }
          default:
            break;
        }
      },
    }); */

    // -------------- Fetch --------------
    fetch(API_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: abortController.signal,
      body: body,
      mode: 'cors'
    }).then(async (response) => {
      const result = await response.json();
      let answer_with_sources = result['result'];
      answer_with_sources += "\n\n\n\nHere are the useful sources that I found:"
      for (let i = 0; i < result['source_documents'].length; i++) {
        const the_source = result['source_documents'][i];
        answer_with_sources += "\n\n";
        answer_with_sources += the_source['title'];
        answer_with_sources += ": ";
        answer_with_sources += the_source['source'];
      }
      setChatHistory((curr) => [
        ...curr,
        { role: "assistant", content: answer_with_sources } as const,
      ]);
      setCurrentChat(null);
      setState("idle");
    });

  };

  return { sendMessage, currentChat, chatHistory, cancel, clear, state };
}
