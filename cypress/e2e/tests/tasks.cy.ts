/// <reference types="cypress" />

const faker = require('faker-br');

describe('Fluxo Completo', () => {
  it('Fluxo Inicial cria uma task - completa a task - delata a task', () => {
    cy.visit('http://127.0.0.1:5173/');
    const task = faker.lorem.sentence();
    cy.get("[data-test='AddNewTask:InputCreateTask']").type(task);
    cy.get("[data-test='AddNewTask:ButtonCreateTask']").click();
    cy.wait(500);
    cy.get("[data-test='NewTaskBox:ButtonCompleteTask']").click();
    cy.wait(500);
    cy.get("[data-test='NewTaskBox:ButtonDeleteTask']").click();
  });
});
