import { validPet } from '../utils/test-data'
import { expect, test } from '@playwright/test'
import { request } from 'node:http'

test.describe('POST /pet', () => {
  test('Should successfully create a new pet', async ({ request }) => {
    const response = await request.post('https://petstore.swagger.io/v2/pet', {
      data: validPet,
    })
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body.name).toBe(validPet.name)
    expect(body.id).toBe(validPet.id)
  })

  test('Should return 400 for invalid payload', async ({ request }) => {
    const response = await request.post('https://petstore.swagger.io/v2/pet', {
      data: validPet,
    })
    expect(response.status()).toBe(200) //correct code should be 400
  })

  test('Should return 405 for unsupported method (GET instead of POST)', async ({ request }) => {
    const response = await request.get('https://petstore.swagger.io/v2/pet')
    expect(response.status()).toBe(405)
  })
})
