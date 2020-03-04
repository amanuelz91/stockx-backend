exports.seed = async function(knex, Promise) {
  return knex('knex_shoes').del()
    .then(function() {
      return knex('knex_true_to_size').del()
    }) 
    .then(function() {
      return knex('knex_shoes ').insert({
        id:1,
        name: 'Yeezy',
        true_to_size_avg: 3,
        count:1
      });
    }).then(function(rows) {
      return knex('knex_shoes').insert({
        id:2,
        name: 'NIKE MAG',
        true_to_size_avg: 3,
        count:1
      });
    }).then(function(rows){
      // console.log('HEY IM ROW ID! ',rows)
      return knex('knex_true_to_size').insert({
        shoe_id:1,
        true_to_size: 3,
        actual_size:6
      })
    })
}; 