// utils/parseMenu.js

export function parseMenu(textoPlano) {
    const lineas = textoPlano.split('\n').map(l => l.trim()).filter(Boolean);
    const productos = [];
  
    let seccionActual = '';
    let productoPendiente = null;
  
    for (let linea of lineas) {
      // Detectar sección (mayúsculas completas, posiblemente con espacios)
      if (/^[A-ZÁÉÍÓÚÜÑ\s]{3,}$/.test(linea) && !linea.startsWith('Elige')) {
        seccionActual = linea.trim();
        continue;
      }
  
      // Detectar línea de producto (empieza con • o o)
      if (/^[•o]/.test(linea)) {
        if (productoPendiente) {
          productos.push(productoPendiente);
        }
  
        const precioMatch = linea.match(/(\d{1,2}[,.]\d{2}) ?€?/);
        const precio = precioMatch ? `${precioMatch[1]} €` : '';
        const nombre = linea
          .replace(/^[•o]/, '')
          .replace(/\.*\s*\d{1,2}[,.]\d{2}\s*€?/, '')
          .trim();
  
        productoPendiente = {
          nombre,
          descripcion: '',
          precio,
          seccion: seccionActual,
        };
      } else if (productoPendiente) {
        // Línea posterior: asumimos que es la descripción
        if (!productoPendiente.descripcion) {
          productoPendiente.descripcion = linea;
        } else {
          productoPendiente.descripcion += ' ' + linea;
        }
      }
    }
  
    // Añadir el último producto pendiente si existe
    if (productoPendiente) {
      productos.push(productoPendiente);
    }
  
    return productos;
  }
  