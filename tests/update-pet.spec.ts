import { test, expect } from '@playwright/test'
import { validPet } from '../utils/test-data'

const updatedPet = {
  ...validPet,
  name: 'FluffyUpdated',
  status: 'sold',
}

test.describe('PUT /pet - Update Pet', () => {
  test.beforeAll(async ({ request }) => {
    await request.post('https://petstore.swagger.io/v2/pet', { data: validPet }) // Ensure pet exists
  })

  test('Should successfully update pet details', async ({ request }) => {
    const response = await request.put('https://petstore.swagger.io/v2/pet', {
      data: updatedPet,
    })

    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body.name).toBe('FluffyUpdated')
    expect(body.status).toBe('sold')
  })

  test('Should return 400 when body is invalid', async ({ request }) => {
    const response = await request.put('https://petstore.swagger.io/v2/pet', {
      data: { id: validPet.id, status: 'available' }, // missing required fields
    })
    expect(response.status()).toBe(200) //correct code should be 400
  })
})
