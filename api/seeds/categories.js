
exports.seed = (knex) => {
  return knex('categories').del()
    .then(() => knex('categories').insert([
      {name: 'Maquillaje', icon: 5},
      {name: 'Cabello', icon: 2},
      {name: 'Uñas', icon: 3},
      {name: 'Emprendimiento', icon: 0}
    ]))
    .then(() => knex('subcategories').del())
    .then(() => knex('subcategories').insert([
      {id_category: 1, name: 'Labios'},
      {id_category: 1, name: 'Ojos'},
      {id_category: 1, name: 'Cejas'},
      {id_category: 1, name: 'Contorno'},
      {id_category: 1, name: 'Maquillaje de día'},
      {id_category: 1, name: 'Maquillaje de noche'},
      {id_category: 1, name: 'Maquillaje fantasía'},

      {id_category: 2, name: 'Comprometria'},
      {id_category: 2, name: 'Cuidados'},
      {id_category: 2, name: 'Peinados'},
      {id_category: 2, name: 'Corte'},
      {id_category: 2, name: 'Balayage'},
      {id_category: 2, name: 'Alisados'},

      {id_category: 3, name: 'Acrílicas'},
      {id_category: 3, name: 'Gel'},
      {id_category: 3, name: 'Acry-Gel'},
      {id_category: 3, name: 'Esmaltes semi-permanentes'},
      {id_category: 3, name: 'Decoracion 3D'},
      {id_category: 3, name: 'Decoracion a mano alzada'},
      {id_category: 3, name: 'Manicure'},
      {id_category: 3, name: 'Pedicure'}
    ]))
}
