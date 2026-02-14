# San Valentín - App de Frases

Esta es una aplicación sencilla construida con **Next.js** y **SQLite** para mostrar frases románticas aleatorias con un diseño elegante y animado.

## Características
- ❤️ Diseño romántico con tonalidades rojas y rosas.
- 📜 Frases aleatorias cargadas desde una base de datos SQLite.
- 💓 Botón en forma de corazón animado para refrescar la frase.
- ✨ Corazones flotantes de fondo para un ambiente de San Valentín.
- 🚀 Lista para ser subida a **Vercel**.

## Cómo usar

### Instalación
1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicializa la base de datos (opcional, ya se incluye una inicial):
   ```bash
   npm run seed
   ```

### Agregar nuevas frases
Puedes agregar frases rápidamente usando el script:
```bash
npm run add-phrase -- "Tu frase romántica aquí"
```

### Desarrollo
Para ejecutar en local:
```bash
npm run dev
```

### Despliegue en Vercel
1. Sube el código a GitHub.
2. Conecta tu repositorio en [Vercel](https://vercel.com).
3. Vercel detectará automáticamente que es un proyecto de Next.js.
4. ¡Listo! La base de datos `.db` se subirá como parte de la construcción y estará disponible en modo lectura.

**Nota:** Dado que SQLite es un archivo local, en Vercel la base de datos es de **solo lectura**. Para agregar frases nuevas, agrégalas localmente y haz un `push` a tu repositorio.
