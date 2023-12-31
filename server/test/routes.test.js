const { server } = require('../src/app');
const session = require('supertest');
const agent = session(server);
describe('',()=>{})

describe ('Test de RUTAS', ()=>{
    describe('GET /countries/:idPais',()=>{
        it('Responde con un status: 200', async()=>{
            await agent.get('/countries/ARG').expect(200);
        });
        it('Responde un objeto con las propiedades: "id", "name", "poblacion", "subregion", "area", "continents", "flags", "capital" e "Activities"', async ()=>{
            const response = await agent.get('/countries/ARG');
            const props = [ "id", "name", "poblacion", "subregion", "area", "continents", "flags", "capital", "Activities"]
            
            props.forEach(prop =>{
                expect (response.body).toHaveProperty(prop)
            })   
        });
        it('Si hay un error responde con status: 500', async()=>{
            await agent.get('/countries/KLJF').expect(500);
        });
    });

    describe('GET /countries/search',()=>{
        it('Responde con un status: 200', async()=>{
            await agent.get('/countries/search').expect(200);
        });
        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async ()=>{
            const response = await agent.get('/rickandmorty/character/23');
            const props = ["id", "name", "species", "gender", "status", "origin", "image"]
            
            props.forEach(prop =>{
                expect (response.body).toHaveProperty(prop)
            })   
        });
        it('Si hay un error responde con status: 500', async()=>{
            await agent.get('/countries/search').expect(500);
        });
    });
});

