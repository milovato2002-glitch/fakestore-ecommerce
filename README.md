# FakeStore E-Commerce App

A full-featured React e-commerce application built with Vite, Redux Toolkit, and React Query.

## Features

- Product catalog pulled live from FakeStoreAPI
- Category filtering with dynamic dropdown from the API
- Add to cart from the product listing page
- Cart with quantity controls, remove items, and running totals
- Checkout simulation that clears cart and sessionStorage
- Image fallback for broken API images
- Cart state persisted in sessionStorage across page refreshes

## Tech Stack

- React 18 + Vite
- Redux Toolkit (cart state management)
- React Query (data fetching)
- React Router DOM (navigation)

## Getting Started

git clone https://github.com/YOUR_USERNAME/fakestore-ecommerce
cd fakestore-ecommerce
npm install
npm run dev

Open http://localhost:5173

## API

This project uses the [FakeStoreAPI](https://fakestoreapi.com/) — a free mock REST API for e-commerce prototypes.
