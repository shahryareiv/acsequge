var program = require('commander');

function parseInputOptions(){
	program
	  .version('0.0.1')
	  .option('-o, --output [output]', 'Output file [output_queries.txt]','output_queries.txt')
	  .option('-i, --input [input]', 'Input JSON file [sample_query_items.json]','sample_query_items.json')
	  .option('-t, --template [template]', 'Template name [handlebars_template.txt]','handlebars_template.txt')
	  .option('-v, --verbose', 'be verbose!')
	  .parse(process.argv);
}
parseInputOptions();

console.log("\n*** Welcome to Acsequge! ***");
console.log("Use it like: node ./acsequge.js -i [input_json_file.json] -t [template.txt] -o [output.txt]\n");

var handlebars = require('handlebars'),
  fs = require('fs');


var template;
fs.readFile(program.template, 'utf-8', function(error, source){
  	template = handlebars.compile(source);
	fs.readFile(program.input,'utf-8',function(error, query_items){
  		var query_object=JSON.parse(query_items);
	  	var result = template(query_object);
		fs.writeFile(program.output,result,function(error){
			if (error) throw error;
		  	console.log('It\'s saved as '+program.output+' !');
		});
  });
});