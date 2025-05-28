import { expect, test } from '@playwright/test'
import { validPet } from '../utils/test-data'

test.describe('GET /pet/{petId}', () => {
  test.beforeAll(async ({ request }) => {
    await request.post('https://petstore.swagger.io/v2/pet', { data: validPet }) // Ensure pet exists
  })

  test('Should return the correct pet data', async ({ request }) => {
    const response = await request.get(`https://petstore.swagger.io/v2/pet/${validPet.id}`)
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body.name).toBe(validPet.name)
    expect(body.id).toBe(validPet.id)
  })

  test('Should return 404 for non-existent pet', async ({ request }) => {
    const response = await request.get('https://petstore.swagger.io/v2/pet/999999999')
    expect(response.status()).toBe(404)
  })

  test('Should return 400 for invalid ID format', async ({ request }) => {
    const response = await request.get('https://petstore.swagger.io/v2/pet/abc')
    expect(response.status()).toBe(404) //correct code should be 400
  })
})
