/* ===================================================
   VIDEOS-DATA.JS — Videos de TikTok del portfolio
   Los videos NO se descargan: se reproducen con el
   reproductor oficial de TikTok al tocarlos.

   Para agregar un video, copia un bloque { ... } y cambia:
     id      el número largo al final del link de TikTok
     url     el link del video (sin "?lang=..." al final)
     cuenta  la cuenta de la marca, con @
     titulo  (opcional) frase corta sobre el video
     vistas  (opcional) número de vistas, sin puntos: 210000
   Portada (opcional): recursos/videos/<id>.webp o <id>.jpg
   Si no hay portada, la tarjeta se muestra igual con fondo de color.
   =================================================== */

window.VIDEOS = {
  // Sección "Videos virales": otras marcas donde participa Rebeca
  virales: [
    {
      id: '7467594348561992965',
      url: 'https://www.tiktok.com/@multimarcas.bo/video/7467594348561992965',
      cuenta: '@multimarcas.bo',
      titulo: '',
      vistas: 1600000,
    },
    {
      id: '7517430974330703109',
      url: 'https://www.tiktok.com/@multimarcas.bo/video/7517430974330703109',
      cuenta: '@multimarcas.bo',
      titulo: '',
      vistas: 385000,
    },
    {
      id: '7597464867745910072',
      url: 'https://www.tiktok.com/@multimarcas.bo/video/7597464867745910072',
      cuenta: '@multimarcas.bo',
      titulo: '',
      vistas: 349000,
    },
    {
      id: '7500282993886416133',
      url: 'https://www.tiktok.com/@multimarcas.bo/video/7500282993886416133',
      cuenta: '@multimarcas.bo',
      titulo: '',
      vistas: 339000,
    },
    {
      id: '7457627728955706630',
      url: 'https://www.tiktok.com/@multimarcas.bo/video/7457627728955706630',
      cuenta: '@multimarcas.bo',
      titulo: '',
      vistas: 210000,
    },
  ],

  // Videos dentro del caso de éxito de JESP
  // (Zen y Nutrioil no tuvieron producción de TikTok)
  jesp: [
    {
      id: '7653494445320539413',
      url: 'https://www.tiktok.com/@jespcarnes/video/7653494445320539413',
      cuenta: '@jespcarnes',
      titulo: '¡Vení a JESP Carnes y llevate los mejores cortes para ver el mundial! ⚽🥩',
    },
    {
      id: '7652761127633390869',
      url: 'https://www.tiktok.com/@jespcarnes/video/7652761127633390869',
      cuenta: '@jespcarnes',
      titulo: '',
    },
    {
      id: '7642722955901930773',
      url: 'https://www.tiktok.com/@jespcarnes/video/7642722955901930773',
      cuenta: '@jespcarnes',
      titulo: '',
    },
  ],
};
