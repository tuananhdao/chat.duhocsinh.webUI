import fetch from 'node-fetch';
import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { ChatMessage } from "../components/ChatMessage";


export const Welcome: React.FC = () => {
  const [contributors, setContributors] = useState("");
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.github.com/repos/tuananhdao/chat.duhocsinh.api/contributors');
    xhr.onload = function() {
      if (xhr.status === 200) {
        let contributors_array = [];
        let response_json = JSON.parse(xhr.responseText);
        for (let i = 0; i <response_json.length; i++)
          contributors_array.push(
            '<a href="'+response_json[i]['html_url']+'" target="_blank">'
            +'<img src="'+response_json[i]['avatar_url']+'" width="20" height="20" style="display:inline;margin-top: -3px;border-radius:50%"/> '
            + response_json[i]['login']
            +'</a>');
          setContributors(contributors_array.join(' '));
      }
    };
    xhr.send();
  }, []);

  return (
  <div className="bg-white border-gray-100 border-2 rounded-lg px-8 py-5 mr-20 w-full">
    <h1 className="text-2xl font-bold mb-2">Hej,</h1>
    <p className='text-justify'>
      I am an AI assistant specializing in information regarding to studying and living in Sweden. What makes me so special is that I will show you the reliable sources of the information I provide. I can answer questions in English, Swedish, and Vietnamese.
    </p>
    <p>
      <br />
      Developers: <span dangerouslySetInnerHTML={{ __html: contributors }}></span>

      <br />
      <a className="underline" target="_blank" href="https://github.com/tuananhdao/chat.duhocsinh.api">
	      <img src="images/github.svg" className="inline h-5 w-5 leading-5" /> Join us on Github
      </a>
    </p>
  </div>
)};
