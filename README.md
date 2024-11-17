## 🚀 About TrustVote

TrustVote is a decentralized electronic voting platform that uses blockchain technology to ensure secure, transparent, and tamper-proof elections. This repository contains the **client-side** code built with **Next.js**, **React**, **TypeScript**, and other modern web technologies.

### ✨ Key Features
- 🔐 **Decentralized Voting**: Ensures secure and immutable vote recording on the Solana blockchain.
- 🗳️ **Real-Time Voting Counts**: Live updates of voting results using **Socket.io**.
- 🕒 **Automated Voting Sessions**: Scheduled voting with **node-scheduler**.
- 🧑‍💻 **Modern UI**: Built with **TailwindCSS**, and **Material UI** for a seamless user experience.

---

## 🛠️ Tech Stack

| **Frontend**            | **Backend (API)**             |
|-------------------------|-------------------------------|
| Next.js (React)         | Node.js (Express)             |
| TypeScript              | MongoDB                       |
| TailwindCSS,            | Socket.io                     |
| Material UI             | Solana Web3.js (Solana SDK)   |

---

## 📦 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x recommended)
- [Git](https://git-scm.com/)
- [Yarn](https://yarnpkg.com/) (or npm)

## Clone the Repository
```bash
git clone https://github.com/HamadUllah16/trustvote-client.git
cd trustvote-client
```

## Install Dependencies

```bash
 yarn install
# or if you prefer npm
npm install
```

## Configure Environment Variables

Create a .env.local file in the root directory and add the following:

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Run the Development Server

```bash
yarn dev
```
# or
```bash
npm run dev
```

Visit http://localhost:3000 to access the application.

---
## 📂 Project Structure
```
trustvote-client/
├─ public/                 Static assets
├─ src/
│  ├── components/         Reusable UI components
│  ├── /page-name          Next.js pages (routes)
│  ├── /redux              React Context for global state
│  ├── utils/              Helper functions
│  ├── /redux/features     API calls (Axios)
│  ├── styles/             Global styles (Tailwind)
├─ .env.local              Environment variables
├─ next.config.js          Next.js configuration
└─ package.json            Project dependencies
```
---

## 🤝 Contributing

Contributions are welcome! To get started:
    Fork this repository.
    Create a new branch: 
    ```bash
    git checkout -b feature/your-feature-name.
    ```
    Commit your changes: 
    ```bash
    git commit -m 'Add feature'.
    ```
    Push to the branch: 
    ```bash
    git push origin feature/your-feature-name.
    ```
    Open a Pull Request.


