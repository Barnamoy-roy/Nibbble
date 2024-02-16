This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Nibbble
This project is a clone of Dribbble, a popular platform for designers to showcase their work and find inspiration. It is built using Next.js, Prisma, MongoDB, Tailwind CSS, Clerk, Firebase Cloud Storage, and Shadcn.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Stunning UI/UX**: Employs Tailwind CSS for pixel-perfect styling, ensuring an immersive user experience.
- **Efficient Server-side Rendering**: Harnesses the power of Next.js for lightning-fast server-side rendering, optimizing performance.
- **Data Management with Prisma**: Seamlessly integrates Prisma as the ORM for agile and scalable data management.
- **Global State Management with Zustand**: Integrated zustand for global state management, carefully created stores for specific state variables.
- **Robust Authentication**: Implements Clerk for secure authentication, with customizable sign-in and sign-up flows.
- **Flexible Storage with Firebase**: Utilizes Firebase Cloud Storage for storing user-generated images, ensuring reliability and scalability.
- **RESTful APIs**: Develops RESTful APIs for seamless communication between the frontend and backend, facilitating smooth data exchange.
- **Component Reusability**: Leverages Shadcn components library for modular UI components, enhancing maintainability and scalability.

## Technologies

- **Next.js**: A React framework for building efficient and scalable web applications.
- **Prisma**: A modern ORM for Node.js and TypeScript, simplifying database interactions.
- **MongoDB**: A flexible and scalable NoSQL database for storing application data.
- **Tailwind CSS**: A utility-first CSS framework for building custom designs with minimal effort.
- **Clerk**: An authentication platform for modern applications, offering seamless user management.
- **Firebase**: A comprehensive platform for building and managing web and mobile applications.
- **Shadcn**: A library of reusable UI components for React, enhancing development efficiency.
- **Zustand**: A Minimal & scalable library to manage global states, updating state efficiency.

First clone the repo, 
```bash
git clone https://github.com/Barnamoy-roy/Nibbble.git
```
move to working directory: 
```bash
cd nibbble
```
Then, install the node modules by running the command in the root directory:

```bash
npm install
```
Next, create a .env file in the root directory and get the clerk publishable key and secret key
Also, create a database in MongoDB and enter the connection url in the .env file:

```.env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="Enter your clerk publishable key here"
CLERK_SECRET_KEY="Enter your clerk secret key here"

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

DATABASE_URL="Enter your database connection url here"
```
Then, create a Firebase project and get the keys, store it in firebase.ts file in the root directory.

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

##usage 
- Sign in or sign up using Clerk authentication to access the platform.
- Explore posts created by fellow designers for inspiration.
- Create, edit, or delete your own posts to showcase your work.
- Upload images for your posts, which will be securely stored in Firebase Cloud Storage.

##Contributing
- Contributions are welcome! If you have any suggestions, feature requests, or bug reports, please open an issue or submit a pull request.

##License
- This project is licensed under the MIT License.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
