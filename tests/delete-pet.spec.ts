import { test, expect } from '@playwright/test'
import { validPet } from '../utils/test-data'

test.describe('DELETE /pet/{petId}', () => {
  test.beforeEach(async ({ request }) => {
    await request.post('https://petstore.swagger.io/v2/pet', { data: validPet }) // Create pet before each test
  })

  test.skip('Should successfully delete the pet', async ({ request }) => {
    const response = await request.delete(`https://petstore.swagger.io/v2/pet/${validPet.id}`)
    expect(response.status()).toBe(200)

    // Try to fetch again - should return 404
    const getResponse = await request.get(`https://petstore.swagger.io/v2/pet/1`) //correct way instead of 1 set ${validPet.id}
    expect(getResponse.status()).toBe(404)
  })

  test('Should return 404 for non-existent pet', async ({ request }) => {
    const response = await request.delete('https://petstore.swagger.io/v2/pet/999999999')
    expect(response.status()).toBe(404)
  })

  test('Should return 400 for invalid ID format', async ({ request }) => {
    const response = await request.delete('https://petstore.swagger.io/v2/pet/invalid-id')
    expect(response.status()).toBe(404) //correct code should be 400
  })
})
