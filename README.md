# Higher lower food - Philippines edition

![Home](https://github.com/bhlox/higher-lower-food/blob/main/public/assets/home%20preview.png)
![Game](https://github.com/bhlox/higher-lower-food/blob/main/public/assets/game%20preview.png)

A game where you compare prices between two menu items and determine which has a higher or lower price range. This is generally for anyone particularly living in the Philippines since these users are consumers of these food brands.

## Features

- Responsive Design: Users can enjoy the game on any device, whether it's a desktop computer, tablet, or smartphone. The responsive design ensures that the game adapts seamlessly to different screen sizes and orientations, providing a consistent experience across devices.
- Reduced repetition of items: This makes sure that the user doesn't get the same food item therefore increasing the chances of randomness further. It would only reset if all items are viewed by the user.
- Animations and transitions: Added a playful element to how the user engages with the content to add a subtle tension to the results.

## Technologies

- Next.js
- Typescript
- Tailwind
- redis: Particularly this is used to store the ids of the food items that were viewed by the end user
- drizzle: a lightweight, type-safe ORM designed for TypeScript projects, offering both relational and SQL-like query APIs for flexible data access. It's serverless-ready by design, supporting major database dialects with zero dependencies, ensuring top performance and a developer-friendly experience
- supabase: this is the postgresql database
- express: Used to scrape the data from the fast food chains
