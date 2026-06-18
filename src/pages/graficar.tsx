import { Chart } from 'react-google-charts';
import { useLocation } from 'react-router-dom';

const GraficaVotos = () => {

  const location = useLocation();
  const contenido = location.state?.contenido || [];
  console.log("CONTENIDO:", contenido);
  console.log("PRIMER REGISTRO:", contenido[0]);

  const provincias: any = {};

  const datosLimpios =
  contenido.length > 0 &&
  contenido[0].Campo1 === 'Cedula'
    ? contenido.slice(1)
    : contenido;

  datosLimpios.forEach((persona: any) => {

    const provincia = persona.Provincia || persona.Campo7;
    const sexo = persona.Sexo || persona.Campo3;

    if (!provincia || !sexo) return;

    if (!provincias[provincia]) {
      provincias[provincia] = {
        hombres: 0,
        mujeres: 0
      };
    }

    if (sexo === 'M') {
      provincias[provincia].hombres++;
    } else {
      provincias[provincia].mujeres++;
    }

  });

  const datosGrafica: any = [
    ['Provincia', 'Hombres', 'Mujeres']
  ];

  const estados: any = {};

datosLimpios.forEach((persona: any) => {

  const estado =
    persona.eCivil || persona.Campo4;

  if (!estado) return;

  if (!estados[estado]) {
    estados[estado] = 0;
  }

  estados[estado]++;

});

const datosEstadoCivil: any = [
  ['Estado Civil', 'Cantidad']
];

Object.keys(estados).forEach((estado) => {

  let nombreEstado = estado;

  if (estado === 'C') nombreEstado = 'Casado';
  if (estado === 'S') nombreEstado = 'Soltero';
  if (estado === 'V') nombreEstado = 'Viudo';
  if (estado === 'D') nombreEstado = 'Divorciado';
  if (estado === 'U') nombreEstado = 'Unión Libre';
  estado === 'U' ? 'Unión Libre' :

  datosEstadoCivil.push([
    nombreEstado,
    estados[estado]
  ]);

});

  Object.keys(provincias).forEach((provincia) => {

    datosGrafica.push([
      provincia,
      provincias[provincia].hombres,
      provincias[provincia].mujeres
    ]);

  });

  return (
    <div className="container mt-4">

      <h1>Distribución por Provincia y Sexo</h1>

      <br />

      <table className="table table-striped">

        <thead>
          <tr>
            <th>Provincia</th>
            <th>Hombres</th>
            <th>Mujeres</th>
          </tr>
        </thead>

        <tbody>

          {Object.keys(provincias).map((provincia) => (

            <tr key={provincia}>
              <td>{provincia}</td>
              <td>{provincias[provincia].hombres}</td>
              <td>{provincias[provincia].mujeres}</td>
            </tr>

          ))}

        </tbody>

      </table>

      <br />

      <Chart
        chartType="ColumnChart"
        width="100%"
        height="500px"
        data={datosGrafica}
      />

      <hr />

<h1>Distribución por Estado Civil</h1>

<table className="table table-striped">

  <thead>
    <tr>
      <th>Estado Civil</th>
      <th>Cantidad</th>
    </tr>
  </thead>

  <tbody>

    {Object.keys(estados).map((estado) => (

      <tr key={estado}>

        <td>
          {estado === 'C' ? 'Casado' :
           estado === 'S' ? 'Soltero' :
           estado === 'V' ? 'Viudo' :
           estado === 'D' ? 'Divorciado' :
           estado === 'U' ? 'Unio Libre' :
           estado}
        </td>

        <td>{estados[estado]}</td>

      </tr>

    ))}

  </tbody>

</table>

<Chart
  chartType="PieChart"
  width="100%"
  height="500px"
  data={datosEstadoCivil}
/>

    </div>
  );
};

export default GraficaVotos;