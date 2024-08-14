# TechBots

- **Deployed Site:** [TechBots](https://techbots.vercel.app/)
- **Developer LinkedIn:** [Ahmad Yousif](https://www.linkedin.com/in/dev-ahmadyousif/)

## Introduction

**TechBots** is an e-commerce platform dedicated to providing a comprehensive selection of computer and electronics parts. Users can browse products, read detailed reviews, manage their shopping cart, and place orders seamlessly.

## Add Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables found in this [.env.example](.env.example) file

## Installation

To run TechBots locally, please follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/ahmadyousif89/techbots.git
   cd techBots
   ```

2. **Install the node module depenencies:**

   ```sh
   pnpm install
   ```

3. **Set up the database:**

   ```sh
   npx prisma db push
   ```

4. **Seed products into the database (one time action):**

   ```sh
   pnpm seed
   ```

5. **Run the development server:**

   ```sh
   pnpm dev
   ```

6. **Access the application:**
   ```
   Open your browser and go to `http://localhost:3000/`.
   ```

## Usage

1. **Register an account:**

- Go to the registration page and create a new account.
  ![Signup](public/images/auth-1.png)
  ![UserProfile](public/images/auth-3.png)

2. **Browse products:**

- Explore various categories of computer and electronics parts.
  ![Products](public/images/p1.png)
  ![Products](public/images/sp-full.png)

3. **Manage your cart:**

- Add items to your cart, update quantities, and remove items as needed.
  ![Cart](public/images/cart-1.png)
  ![Shipping-1](public/images/cart-ship1.png)
  ![Shipping-2](public/images/cart-ship2.png)
  ![Shipping-3](public/images/cart-ship3.png)

4. **Place an order:**

- Proceed to checkout, enter your shipping information, and complete the payment process.
  ![Orders](public/images/orders.png)
  ![Order](public/images/order.png)

5. **Write reviews:**

- Share your feedback on purchased products by writing reviews.
  ![Review](public/images/review.png)

## Contributing

We welcome contributions from the community! To contribute to TechBots:

1. **Fork the repository:**

   Click on the "Fork" button at the top right corner of the repo page.

2. **Clone your fork:**

   ```sh
   git clone https://github.com/ahmadyousif89/techbots.git
   cd techbots
   ```

3. **Create a new branch:**

   ```sh
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes:**

   Implement your feature or bug fix.

5. **Commit your changes:**

   ```sh
   git add .
   git commit -m "Add feature/your-feature-name"
   ```

6. **Push to your fork:**

   ```sh
   git push origin feature/your-feature-name
   ```

7. **Create a pull request:**

   Go to the original repository and click on "New Pull Request."

<br>

## License

This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.

<br>
<br>

### Thank you for using Techbots!

For any questions or feedback, please contact us through our [LinkedIn page](https://www.linkedin.com/in/dev-ahmadyousif/).
