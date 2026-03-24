import { test, expect } from '@playwright/test';

test('deve consltar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/');

//Checkpoint
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  //Clica no link de consultar pedido
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()

  //Checkpoint
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // preenche localzador de pedido
  await page.getByTestId('search-order-id').fill('VLO-AE2RCC')

  //Clica no botão de buscar pedido
  await page.getByTestId('search-order-button').click()


  //Checkpoint - valida se esta visivel na tela o resultado do pedido
  await expect(page.getByTestId('order-result-id')).toBeVisible()

  //Checkpoint - valida se o pedido foi encontrado
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-AE2RCC')

  //Checkpoint - valida se o status do pedido é aprovado
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')



});
