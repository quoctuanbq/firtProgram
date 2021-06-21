const bcrypt = require('bcrypt');
const saltRounds = 5;
let hash1 = '$2b$05$gX1EzGq9sUpnM69362oKBOFsbuffCDuGxpZ9U7.GQHxCagWMuCC8O'
let hash2 = '$2b$05$3z9oAW/mzFjr.5pMNE5S8.uAc1WmJLz2Z5eqdVSxvzL4u1rXzBC3q'
let password = 'thai'




console.log(1);

bcrypt.genSalt(saltRounds, function (err, salt) {
  bcrypt.hash(password, salt, async function (err, hash) {
    // Store hash in your password DB.
    if (hash) {
      console.log(has);
      return hash
    } else {
      return err
    }
  });
});



test()

// bcrypt.compare(password, hash2, function (err, result) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });


