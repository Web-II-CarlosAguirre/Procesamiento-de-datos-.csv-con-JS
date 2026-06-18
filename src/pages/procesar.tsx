import { useLocation } from 'react-router-dom';

const Procesar = () => {
  const location = useLocation();
  const contenido = location.state?.contenido || [];

  if (contenido.length === 0) {
    return <h2>No hay datos para mostrar</h2>;
  }

  const encabezados = Object.keys(contenido[0]);

  const detectarTipo = (valor: any) => {
    if (valor === null || valor === undefined)
      return 'string';

    if (typeof valor === 'number')
      return 'number';

    if (
      typeof valor === 'string' &&
      valor.length === 1
    )
      return 'char';

    if (
      typeof valor === 'string' &&
      !isNaN(Date.parse(valor))
    )
      return 'date';

    return 'string';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Procesar 🚀</h1>

      <h2>Estructura de Datos</h2>

      <table border={1}>
        <thead>
          <tr>
            <th>Campo</th>
            <th>Tipo</th>
          </tr>
        </thead>

        <tbody>
          {encabezados.map((campo, index) => (
            <tr key={index}>
              <td>{campo}</td>
              <td>
                {detectarTipo(
                  contenido[0][campo]
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <h2>Primeros Registros</h2>

      <table border={1}>
        <thead>
          <tr>
            {encabezados.map((campo, index) => (
              <th key={index}>{campo}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {contenido.slice(0, 10).map((fila: any, i: number) => (
            <tr key={i}>
              {encabezados.map((campo, j) => (
                <td key={j}>
                  {fila[campo]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Procesar;