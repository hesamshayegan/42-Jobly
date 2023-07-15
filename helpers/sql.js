const { BadRequestError } = require("../expressError");

/* Function name: sqlForPartialUpdate
*
* Arguments: dataToUpdate (dictionary of data to update) and 
*    jsToSql (mapping from JavaScript property names to SQL column names)
*
* Returns: A dictionary with two properties:
*    setCols (a comma-separated list of SQL expressions) and
*    values (a list of the values in the dataToUpdate dictionary)
*
* Usage:
*  const dataToUpdate = {firstName: "Aliya", age: 32};
*
*  const jsToSql = {firstName: "first_name", age: "age",};
*
*  const sql = sqlForPartialUpdate(dataToUpdate, jsToSql);
*
*  => { setCols: '"first_name"=$1, "age"=$2', values: ['Aliya', 32] }
*
*/


function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
