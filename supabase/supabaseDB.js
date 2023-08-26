const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://tubnpuzyuhjyhslwbshd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Ym5wdXp5dWhqeWhzbHdic2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI4NTc1OTEsImV4cCI6MjAwODQzMzU5MX0.G-Z3MGdzPiDCEpa_vOpriMvivCrlyBInVuf8z1COOxQ';
const tableName = 'posts'; 

const client = createClient(supabaseUrl, supabaseKey);



async function insertData() {
  try {
    const { data, error } = await client.from.tableName.upsert(dataToInsert).select();
    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Inserted data:', data);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

insertData();
