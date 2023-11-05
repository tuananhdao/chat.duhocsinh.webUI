export const Welcome: React.FC = () => (
  <div className="bg-white border-gray-100 border-2 rounded-lg px-8 py-5 mr-20 w-full">
    <h1 className="text-2xl font-bold mb-2">Hej,</h1>
    <p>
      I am an AI assistant specializing in information regarding to studying and living in Sweden. What makes me so special is that I will give you exact source documents of each information I provide. I can answer questions in English, Swedish, and Vietnamese.
    </p>
    <p>
      <br />
      Contributors: 

      <br />
      <a className="underline" target="_blank" href="https://github.com/tuananhdao/chat.duhocsinh.api">
	      <img src="images/github.svg" className="inline h-5 w-5 leading-5" /> Github repo
      </a>
    </p>
  </div>
);
