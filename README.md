Demo: [chat.duhocsinh.se](https://chat.duhocsinh.se)

Backend API repo: [tuananhdao/chat.duhocsinh.api](https://github.com/tuananhdao/chat.duhocsinh.api)

### Quick Start

Install NodeJS LTS from [NodeJs Official Page](https://nodejs.org/en/?ref=horizon-documentation)

Clone the repository with the following command:

```bash
git clone https://github.com/tuananhdao/chat.duhocsinh.webUI.git
```

Run in the terminal this command:

```bash
npm install
```
Rename `.env.example` to `.env` and provide `API_URL` (with correct port). From browser, go to `{API_URL}/q`, you should see `It is working`.

Then,

```bash
npm run dev
```

The frontend is live at `localhost:3000`

### Deployment

Run this command to build the static files to `/out` folder

```bash
npm run build
```
Then upload the content of the `/out` folder to the public folder which hosts the frontend.
