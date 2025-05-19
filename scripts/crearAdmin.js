// crearAdmin.ts
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const supabaseUrl = 'https://svxzrewhxwpzockxitcr.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2eHpyZXdoeHdwem9ja3hpdGNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxODg0NTUsImV4cCI6MjA2Mjc2NDQ1NX0.o5JrzXbNj1uO140OvIRiGrKnWOy5yShE1zTvUZfKF6Y'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function crearUsuarioAdmin() {
  const username = 'admin5';
  const identificacion = '123456789';
  const passwordPlano = '1234';
  const role = 'ADMIN';

  const { data: existe, error: errorBusqueda } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (existe) {
    console.log('⚠️ Ya existe un usuario con ese nombre.');
    return;
  }

  const passwordHash = await bcrypt.hash(passwordPlano, 10);

  const { error } = await supabase.from('users').insert([
    {
      identificacion,
      username,
      password_hash: passwordHash,
      role,
    },
  ]);

  if (error) {
    console.error('❌ Error creando el usuario :', error.message);
  } else {
    console.log('✅ Usuario  creado exitosamente.');
  }
}

crearUsuarioAdmin();
