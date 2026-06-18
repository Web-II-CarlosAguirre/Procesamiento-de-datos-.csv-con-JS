import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { usePapaParse } from 'react-papaparse';

import {
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox
} from '@mui/material';

interface FormData {
  txtArchi: FileList;
  separador: string;
  encabezado: boolean;
}

const App = () => {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      separador: ';',
      encabezado: false
    }
  });

  const navigate = useNavigate();
  const { readString } = usePapaParse();

  const onSubmit = (data: FormData) => {
    const file = data.txtArchi[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;

      readString(text, {
        delimiter: data.separador,
        header: data.encabezado,
        dynamicTyping: true,

        complete: (result: any) => {
          let datos = result.data;

          if (!data.encabezado) {
            datos = datos.map((fila: any[]) => {
              const obj: any = {};

              fila.forEach((valor, index) => {
                obj[`Campo${index + 1}`] = valor;
              });

              return obj;
            });
          }

          console.log('Datos procesados:', datos);

          navigate('/graficar', {
            state: {
              contenido: datos,
              encabezado: data.encabezado,
              separador: data.separador
            }
          });
        }
      });
    };

    reader.readAsText(file);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Lectura de archivos CSV
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <input
              {...register('txtArchi', { required: true })}
              type="file"
              accept=".csv,.txt"
            />

            <TextField
              label="Separador"
              {...register('separador')}
            />

            <FormControlLabel
              control={<Checkbox {...register('encabezado')} />}
              label="El archivo posee encabezados"
            />

            <Button
              type="submit"
              variant="contained"
            >
              Procesar
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default App;