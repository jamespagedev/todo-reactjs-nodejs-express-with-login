// For loop to generate numOfFakeUsers
const generateSeeds = () => {
  let arr = [];

  // initial todos
  arr.push({
    user_id: 1,
    details: "Work on error handling between proxy and backend.",
    created_by: 1, // initial user id
    last_edited_by: 1 // initial user id
  });
  arr.push({
    user_id: 1,
    details: "Work on getting ssl certs to work with https setup.",
    created_by: 1, // initial user id
    last_edited_by: 1 // initial user id
  });
  arr.push({
    user_id: 1,
    details: "Work on setting up proper token authentication.",
    created_by: 1, // initial user id
    last_edited_by: 1 // initial user id
  });
  arr.push({
    user_id: 1,
    details: "Work on setting up database to store hash passwords and data.",
    created_by: 1, // initial user id
    last_edited_by: 1 // initial user id
  });
  arr.push({
    user_id: 1,
    details: "Work on styling. Responsive. Login/Logout. Disable scroll body while scrolling on action item.",
    created_by: 1, // initial user id
    last_edited_by: 1 // initial user id
  });
  arr.push({
    user_id: 1,
    details: "This is a long todo message. Morbi lorem nisl, iaculis a ipsum id, porta facilisis leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut posuere nisi sit amet tincidunt rutrum. Nulla in cursus eros, vel tempus sem. Vivamus ante risus, euismod vel sapien vel, rhoncus ullamcorper justo. Vivamus facilisis pharetra interdum. Quisque auctor scelerisque suscipit. Proin eget tortor non mauris faucibus pharetra. Integer in commodo nisi. Sed lobortis auctor metus vitae accumsan. Phasellus pretium, nibh ut consectetur tempor, dolor tellus venenatis risus, non malesuada elit quam nec metus. Quisque accumsan aliquam tincidunt. Vivamus interdum ipsum sit amet diam lacinia molestie eget eu quam. Morbi lorem nisl, iaculis a ipsum id, porta facilisis leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut posuere nisi sit amet tincidunt rutrum. Nulla in cursus eros, vel tempus sem. Vivamus ante risus, euismod vel sapien vel, rhoncus ullamcorper justo. Vivamus facilisis pharetra interdum. Quisque auctor scelerisque suscipit. Proin eget tortor non mauris faucibus pharetra. Integer in commodo nisi. Sed lobortis auctor metus vitae accumsan. Phasellus pretium, nibh ut consectetur tempor, dolor tellus venenatis risus, non malesuada elit quam nec metus. Quisque accumsan aliquam tincidunt. Vivamus interdum ipsum sit amet diam lacinia molestie eget eu quam.",
    created_by: 1, // initial user id
    last_edited_by: 1 // initial user id
  });
  return arr;
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries for users table
  return knex('todos')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('todos').insert(generateSeeds());
    });
};
