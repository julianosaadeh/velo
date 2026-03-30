import { test, expect } from '@playwright/test';
import { generateOrderCode } from '../support/helpers';
import { ConsultaPedidoPage } from '../support/pages/ConsultaPedidoPage';


//AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ page }) => {
    //Arrange - Prepara o teste
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  })

  test('deve consltar um pedido aprovado', async ({ page }) => {

    const order = 'VLO-AE2RCC'

    //Act - Executa a ação
    const consultaPedidoPage = new ConsultaPedidoPage(page)
    await consultaPedidoPage.buscarPedido(order)

    //Assert 
    //Snapshot Playwright
    await expect(page.getByTestId('order-result-VLO-AE2RCC')).toMatchAriaSnapshot(`
      - paragraph: Pedido
      - paragraph: VLO-AE2RCC
      - text: APROVADO
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: Lunar White
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: aero Wheels
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: juliano saadeh SAADEH
      - paragraph: Email
      - paragraph: julianosaadeh@hotmail.com
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: À Vista
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);


  })

  test('Deve exibir mensagem quando o pedido nao é encontrado', async ({ page }) => {

    const order = generateOrderCode()

    //Act - Executa a ação
    const consultaPedidoPage =  new ConsultaPedidoPage(page)
    await consultaPedidoPage.buscarPedido(order)

    //Assert 
    // usando o assert no codegen temos um nivel de validação melhor para teste
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)
  })

  test('Deve exibir mensagem quando o pedido está em analise', async ({ page }) => {

    const order = 'VLO-Z8U71A'

    //Act - Executa a ação
    const consultaPedidoPage =  new ConsultaPedidoPage(page)
    await consultaPedidoPage.buscarPedido(order)

    //Assert 
    await expect(page.getByTestId('order-result-VLO-Z8U71A')).toMatchAriaSnapshot(`
    - paragraph: Pedido
    - paragraph: VLO-Z8U71A
    - text: EM_ANALISE
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: Lunar White
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: aero Wheels
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: Beto Carrero
    - paragraph: Email
    - paragraph: julianosaadeh@hotmail.com
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: À Vista
    - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);

  })

  test('Deve exibir mensagem quando um pedido é reprovado', async ({ page }) => {

    const order = 'VLO-WJZ47L'

    //Act - Executa a ação
    const consultaPedidoPage =  new ConsultaPedidoPage(page)
    await consultaPedidoPage.buscarPedido(order)

    //Snapshot Playwright
    await expect(page.getByTestId('order-result-VLO-WJZ47L')).toMatchAriaSnapshot(`

      - paragraph: Pedido
      - paragraph: VLO-WJZ47L
      - text: REPROVADO
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: Glacier Blue
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: sport Wheels
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: juliano saadeh
      - paragraph: Email
      - paragraph: julianosaadeh@hotmail.com
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: À Vista
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

  })

})
