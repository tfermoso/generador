/*
This program reads and parses all lines from csv files countries2.csv into an array (countriesArray) of arrays; each nested array represents a country.
The initial file read is synchronous. The country records are kept in memory.
*/
 
var fs = require('fs');
var parse = require('csv-parse');
const TokenGenerator = require('uuid-token-generator');

const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58

var inputFile='Usuarios.csv';
console.log("Generando los token para los usuarios");
var lista='{"listado":['; 
var parser = parse({delimiter: ';'}, function (err, data) {
    // when all countries are available,then process them
    // note: array element at index 0 contains the row of headers that we should skip
    data.forEach(function(line) {
        var token=tokgen.generate();
      // create country object out of parsed fields
      var user = { "name" : line[0] +" "+line[1]
                    , "phone" : line[2]
                    , "url" : "http://louzao.gruposicom.com/landing/"+token
                    };
    
     lista=lista+JSON.stringify(user)+",";
                  
     //console.log(usuarios);
    }); 

    //lista=lista.substring(0, lista.Length-1);
    lista=lista+"]}"; 
    console.log(lista); 
    //Generamos un csv con los datos.
    fs.writeFile("./datos.json", lista, function (err) {
        console.log("Escribir");
        // la funcion es la que maneja lo que sucede despues de termine el evento
        if (err) {
            return console.log(err);
        }
        // las funciones de javascript en nodejs son asincronicas
        // por lo tanto lo que se quiera hacer debe hacerse dentro de la funcion que maneja el evento
        // si uno declara una variable arriba de la funcion, la manipula dentro y la quiere usar
        // despues afuera, se corre el riezgo de que nunca se realice la manipulacion.
        console.log("The file was saved!");
    });
});
 
//read the inputFile, feed the contents to the parser
fs.createReadStream(inputFile).pipe(parser);



