document.addEventListener('DOMContentLoaded', function() {
    // Rutas de imágenes
    const RUTA_IMAGEN_RESTAURANTE = './img/Logo1.png';
    const RUTA_IMAGEN_FONDO = './img/Restaurante.png';
    
    // Variable booleana para modo de visualización
    const MODO_DEMO = true; // Cambia a true para modo spinner continuo

    // Establecer la ruta de la imagen de restaurante
    document.getElementById('restaurant-logo').src = RUTA_IMAGEN_RESTAURANTE;

    // Establecer la ruta de la imagen de fondo
    document.getElementById('background-overlay').style.backgroundImage = `url('${RUTA_IMAGEN_FONDO}')`;

    // Desactivar zoom en dispositivos móviles
    const metaViewport = document.querySelector('meta[name="viewport"]');
    metaViewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');

    // Links para diferentes días
    const LINK_SEMANA = 'https://ejemplo.com/menu-semana'; // Reemplazar con tu link de semana
    const LINK_FIN_SEMANA = 'https://ejemplo.com/menu-fin-semana'; // Reemplazar con tu link de fin de semana

    // Función para determinar si es fin de semana
    function esFinDeSemana() {
        const hoy = new Date();
        const diaSemana = hoy.getDay();
        // 0 (domingo) y 6 (sábado)
        return diaSemana === 0 || diaSemana === 6;
    }

    // Lógica de redirección
    if (MODO_DEMO) {
        // En modo demo, el spinner continúa girando
        console.log('Modo Demostración Activado: Spinner en bucle infinito');
    } else {
        // En modo producto, redirige después de 2 segundos
        setTimeout(function() {
            const linkDestino = esFinDeSemana() ? LINK_FIN_SEMANA : LINK_SEMANA;
            window.location.href = linkDestino;
        }, 2000);
    }

    // Función para cargar frases desde un archivo y mostrar una aleatoria
    async function cargarFrases() {
        try {
            // Usamos fetch para obtener el archivo de frases (debe estar en la misma carpeta o ruta correcta)
            const response = await fetch('./data/Frases-Paisas.txt'); // Asegúrate de tener el archivo frases.txt en el mismo directorio
            const data = await response.text();

            // Dividimos el contenido del archivo en un array de frases (una por línea)
            const frases = data.split('\n').map(frase => frase.trim()).filter(frase => frase.length > 0);

            // Seleccionamos una frase aleatoria
            const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];

            // Insertamos la frase en el div con id "frase-paisa" y agregamos las comillas dobles
            document.getElementById('frase-paisa').innerText = `"${fraseAleatoria}"`;

        } catch (error) {
            console.error('Error al cargar las frases:', error);
        }
    }

    // Llamamos a la función para cargar las frases cuando se cargue la página
    cargarFrases();
});
