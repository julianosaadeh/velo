import { test, expect } from '@playwright/test';

//AAA - Arrange, Act, Assert

test('deve consltar um pedido aprovado', async ({ page }) => {

  //Arrange - Prepara o teste
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')


  //Act - Executa a ação
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-AE2RCC')
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()

  //await page.getByTestId('search-order-id').fill('VLO-AE2RCC')
  //await page.getByTestId('search-order-button').click()


  //Assert 
  await expect(page.getByText('VLO-AE2RCC')).toBeVisible()
  await expect(page.getByTestId('order-result-VLO-AE2RCC')).toContainText('VLO-AE2RCC')
 
  //await expect(page.getByTestId('')).toBeVisible({ timeout: 10_000 }) //10 segundos
  //await expect(page.getByTestId('')).toContainText('VLO-AE2RCC')

  await expect(page.getByTestId('order-result-status')).toBeVisible()
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')


});
