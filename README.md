# Craftify - Handmade & Local Artisan Marketplace

Craftify is a modern e-commerce platform where local artists and small-scale crafters can showcase and sell their handmade goods—like jewelry, candles, art prints, home decor, and more.

## Features

- Responsive design built with Tailwind CSS
- Beautiful animations with Framer Motion
- Product listings with filtering
- Category browsing
- Artisan showcases
- Shopping cart functionality
- User authentication
- Stripe payment integration (coming soon)

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- **Authentication**: NextAuth.js
- **Payment Processing**: Stripe
- **Database**: MongoDB (coming soon)

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/craftify.git
cd craftify
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
craftify/
├── app/                   # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── ...                # Other pages
├── components/            # React components
│   ├── layout/            # Layout components
│   ├── home/              # Homepage components
│   ├── products/          # Product-related components
│   └── ...                # Other components
├── data/                  # Data files
├── public/                # Static files
│   └── patterns/          # Pattern SVGs
├── styles/                # Global styles
└── ...
```

## Pages

- **Home**: Featured products, categories, testimonials
- **Shop**: All products with filters
- **Product Detail**: Detailed view of a product
- **Categories**: Browse by category
- **Artisans**: Discover artisans
- **Cart**: Review cart and checkout
- **Account**: User account management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Artisan Components

This project includes several components for showcasing artisans and their products:

### Artisan Profile

The `ArtisanProfile` component displays an individual artisan's details, including:
- Profile image and cover photo
- Bio and personal information
- Social media links
- Achievements
- Gallery of work
- Reviews

It's used on the artisan's profile page and includes tabs for different sections of content.

### Artisan Products

The `ArtisanProducts` component shows all products from a specific artisan, with:
- Category filtering
- Sorting options (price, rating, etc.)
- Availability filtering
- Responsive grid layout

### Artisan Reviews

The `ArtisanReviews` component displays customer reviews for an artisan, featuring:
- Rating summary and breakdown
- Sortable review list
- Rating filters
- Review details including photos

### Navigation Components

- `ArtisanProfileNav`: Tab navigation for the artisan's profile pages
- `Breadcrumbs`: Navigation breadcrumbs for improved site navigation

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Open [http://localhost:3012](http://localhost:3012) in your browser.

## Project Structure

- `/app`: Next.js app router pages
- `/components`: React components
  - `/artisans`: Artisan-related components
  - `/products`: Product-related components
  - `/ui`: Reusable UI components
- `/lib`: Utility functions and helpers
- `/public`: Static assets

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI (for accessible UI components)

## MongoDB Setup for Admin Authentication

This application requires MongoDB for admin authentication. Follow these steps to set it up:

1. Make sure you have MongoDB installed locally or use MongoDB Atlas for a cloud-hosted solution.

2. Create a `.env.local` file in the root directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/cratify
   ```
   
   If you're using MongoDB Atlas, replace the URI with your Atlas connection string.

3. The first time you access the admin login page, the system will automatically create a default admin user with:
   - Username: `admin`
   - Password: `admin`

4. For security in production, you should change the default admin credentials after first login.
