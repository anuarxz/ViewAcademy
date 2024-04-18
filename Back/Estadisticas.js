const { default: axios } = require("axios");
apiUrl = 'http://localhost:4000/estadisticas/create';

async function guardarEstadistica(req, i){
	var index ;

	if (i == 0)
		index = 'Asistente Virtual';
	else if (i == 1)
		index = 'ChatPDF';
	else if (i == 2)
		index = 'ResumenPDF';
	else if (i == 3)
		index = 'seleccionarAlumno';
	else if (i == 4)
		index = 'EvaluacionCompetencias';

	var dia = new Date().getDate();
	var mes = new Date().getMonth() + 1;
	var año = new Date().getFullYear();
	if (req.body.content == undefined)
		req.body.content = "Subida de archivo";

	await axios.post(apiUrl, {
		user: req.body.user,
		servicio: index,
		content: req.body.content,
		fecha: dia + '/' + mes + '/' + año
	})
}

module.exports =  guardarEstadistica;