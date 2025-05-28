#Swagger Petstore API
#URL=https://petstore.swagger.io

#Test Cases

##POST /pet
#Purpose: Add a new pet to the store.

#Tests:
#Should successfully create a new pet with valid data.
#Should return 405 when method is not allowed (e.g., invalid HTTP verb).
#Should return 400 for invalid payload.

##GET /pet/{petId}
#Purpose: Fetch a pet by its ID.

#Tests:
#Should return the correct pet data for an existing pet.
#Should return 404 for a non-existent pet.
#Should return 400 for an invalid ID format.

#Project setup
npm init -y
npm install --save-dev playwright @playwright/test typescript ts-node
npx playwright install

#HTTP status codes installed:
npm install http-status-codes

#Prettier installed:
npm install --save-dev prettier

#To check the code format:
npx prettier . --check
npx prettier . --write

#To run all test cases use
npx playwright test
npx playwright test tests/update-pet.spec.ts
npx playwright test tests/delete-pet.spec.ts

npx playwright test --project=firefox
npx playwright test --project=firefox --workers=1
npx playwright test --project=chromium --workers=1
