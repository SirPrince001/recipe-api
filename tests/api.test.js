const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

// function to generate a unique recipe 
const generateRecipe = () => {
    return {
        recipe_title: 'test recipe',
        description: 'test description',
        ingredients: ['test ingredient'],
        instruction: ['test step'],
        category: 'test category',


    };
};

//clear the database each time before asuite is ran
beforeEach(async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        await collection.deleteMany({})
    }
})

// close all mongoose collection after all test
afterAll(async () => {

    await mongoose.connection.close();
})

// Test to create recipe
describe('POST /recipes', () => {
    it('should create a new recipe', async () => {
        const newRecipe  = generateRecipe();
        const response = await request(app).post('/recipes').send(newRecipe);
        expect(response.statusCode).toBe(201);
        expect(response.responseMessage).toHaveProperty('_id');
        expect(response.responseMessage).toBe(newRecipe.recipe_title);
        expect(response.responseMessage).toBe(newRecipe.description);
        expect(response.responseMessage).toBe(newRecipe.ingredients);
        expect(response.responseMessage).toBe(newRecipe.instruction);
        expect(response.responseMessage).toBe(newRecipe.category);

    },10000)

}) 