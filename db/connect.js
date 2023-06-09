const oracledb = require('oracledb');
const run=async ()=> {
  try {
    await oracledb.createPool({
      user: 'dbe',
      password: 'dbe',
      connectString: 'localhost:1521/xe',
    });
  
    console.log("Successfully connected to Oracle Database");

  

  } catch (err) {
    console.error(err);
  }
  }

  module.exports = {run};
