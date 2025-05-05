import { NextResponse } from 'next/server';
import parsePDF from 'pdf-parse/lib/pdf-parse.js';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No se recibió archivo' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const data = await parsePDF(buffer);

    return NextResponse.json({ text: data.text });
  } catch (err) {
    console.error('Error al procesar el PDF:', err);
    return NextResponse.json({ error: 'Error procesando el PDF' }, { status: 500 });
  }
}
