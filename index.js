import express from "express";
import pg from "pg";

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true })); // replaces body-parser
app.use(express.static("public"));
app.set("view engine", "ejs");

// Database connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Shriram@100",
  port: 5433,
});
db.connect();

// Home page - show visited countries
app.get("/", async (req, res) => {
  try {
    const countries = await checkVisited(); 
    
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
     });
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching visited countries");
  }
});

// Add a new country
app.post("/add", async (req, res) => {
  const input = req.body.country; // country name from form
  
const country =  await capitalizeCountry(input);

  // 1. Get the country_code by countries table
  try {
   
    
      const result = await db.query(
  "SELECT country_code FROM countries WHERE  country_name LIKE $1  OR country_name LIKE $1 || ' %' OR country_name LIKE $1 || ', %' ",   
 
  [country]
);

   
const data = result.rows[0];
 const countryCode = data.country_code;
    
    // 2. Insert the country_code into visited_countries table 
     
    try {
    await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    }
    
// Handle case where country is already visited

    catch (err) {
      // console.log(err);
         const countries = await checkVisited();

     
    res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      });
    }
  }
  
// Handle case where country name does not exist

  catch (err) {
    
   const countries = await checkVisited();

    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
error: "Country name does not exist, try again.",

     });
    
    }
  
});

//seprate function for using everywhere:

async function checkVisited() {
  const result = await db.query("SELECT country_code FROM visited_countries");
    const countries = result.rows.map((row) => row.country_code);
    return countries;

}


// Async function to capitalize first letter of input
async function capitalizeCountry(input) {
  
  // Trim spaces and capitalize first letter
  const formatted =
    input.trim().charAt(0).toUpperCase() + input.trim().slice(1).toLowerCase();
  return formatted;
}



// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});