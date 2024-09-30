# Project for the boohoo.com store - Playwright Test Automation

## Project Overview

This project is a test automation framework built with [Playwright](https://playwright.dev/) and TypeScript. It is designed to automate and test core functionalities of a web application such as login, search, product pages, cart management, profile editing, and wishlist management.

The project uses:
- **Page Object Model (POM)** for managing page interactions
- **Singleton Pattern** for browser and page management
- **Allure reporting** for detailed test reports

## Project Structure

- **tests/**: Contains test suites (login, search, product, cart, profile, wishlist, etc.)
- **patterns/**: Holds design pattern implementations (e.g., `BrowserSingleton`, `PageFactory`)
- **pages/**: Contains page classes corresponding to different sections of the web application
- **data/**: Includes test data and locators used throughout the tests
- **helpers/**: Contains utility functions for test operations

## Setup and Installation

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v20 or above)
- **npm** (v10 or above)

### Installation

1. Clone the folder with project from repository:
   ```bash
    git clone --no-checkout https://github.com/SergioRyzhov/JSautoqa.git
    cd JSautoqa
    git sparse-checkout init --cone
    git sparse-checkout set final_project

2. Install the dependencies:
    ```bash
    npm install

3. Set up environment variables: Create a .env file in the root directory and set the necessary environment variables (e.g., BASE_URL, LOGIN_CREDENTIALS, etc.).

## Running Tests

### Run All Tests

To run all the tests in the project:

```bash
npm test
```

### Run Specific Test Suites

You can run specific test suites using the following commands:

- Login Tests:
    ```bash
    npm run test-login
    ```
- Search Tests:
    ```bash
    npm run test-search
    ```
- Product Tests:
    ```bash
    npm run test-product
    ```
- Cart Tests:
    ```bash
    npm run test-cart
    ```

- Cart Tests:
    ```bash
    npm run test-cart
    ```
- Profile Tests:
    ```bash
    npm run test-profile
    ```
- Wishlist Tests:
    ```bash
    npm run test-wishlist
    ```
- Logout Tests:
    ```bash
    npm run test-logout
    ```
## Test Reporting

This project integrates Allure reporting. To generate and view test reports:

1. Run the tests with Allure:
    ```bash
    npm test
2. Generate the Allure report:
    ```bash
    npx allure generate allure-results --clean -o allure-report
3. Open the report in a browser:
    ```bash
    npx allure open allure-report

## Additional Configurations
- Timeouts: Global timeouts and specific expectations for tests are set in the Playwright configuration file (playwright.config.ts).
- Workers: The tests are configured to run with a single worker (workers: 1) in the config file, ensuring sequential execution. The cause to use 1 worker is captchas.
