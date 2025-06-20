'use server'; // Indica que este archivo se ejecuta del lado del servidor
 
import { z } from 'zod'; // Importa Zod para validación de esquemas
import { revalidatePath } from 'next/cache'; // Permite revalidar rutas en la caché
import { redirect } from 'next/navigation'; // Permite redirigir al usuario
import postgres from 'postgres'; // Cliente para conectar a PostgreSQL
import { signIn } from '@/auth'; // Función para iniciar sesión
import { AuthError } from 'next-auth'; // Clase de error de autenticación

// Conexión a la base de datos PostgreSQL usando la URL de entorno
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Esquema de validación para los formularios de facturas
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.', // Mensaje si no se selecciona cliente
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }), // Valida que el monto sea mayor a 0
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.', // Mensaje si no se selecciona estado
  }),
  date: z.string(),
});
 
// Esquema para crear una factura (omite id y fecha)
const CreateInvoice = FormSchema.omit({ id: true, date: true });

// Tipo para el estado del formulario (errores y mensajes)
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// Función para crear una factura
export async function createInvoice(prevState: State, formData: FormData) {
  // Valida el formulario usando Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // Si la validación falla, retorna los errores
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepara los datos para insertar en la base de datos
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  // Inserta la factura en la base de datos
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // Si ocurre un error en la base de datos, retorna un mensaje de error
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // Revalida la caché de la página de facturas y redirige al usuario
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Esquema para actualizar una factura (omite id y fecha)
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
// Función para actualizar una factura existente
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  // Valida los campos del formulario
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // Si la validación falla, retorna los errores
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  // Prepara los datos para actualizar en la base de datos
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  // Actualiza la factura en la base de datos
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  // Revalida la caché y redirige al usuario
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Función para eliminar una factura
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to Delete Invoice');
  }
}

// Función para autenticar al usuario (login)
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
    return undefined; // Autenticación exitosa, sin mensaje de error
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales inválidas.'; // Usuario o contraseña incorrectos
        default:
          return 'Ocurrió un error inesperado.'; // Otro error
      }
    }
    throw error;
  }
}