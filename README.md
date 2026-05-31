# Chrono Service — Plataforma Web Profesional

¡Bienvenido al repositorio de **Chrono Service**! Este proyecto consiste en una plataforma web corporativa, moderna y minimalista, optimizada con una estética limpia, tipografías legibles y un diseño completamente adaptativo (*Responsive Design*). 

La interfaz implementa estructuras visuales avanzadas como *Bento Grid* para la presentación de capacidades, un visor inmersivo dinámico para el porfolio y una calculadora interactiva de presupuestos por pasos.

---

## 🚀 Características Principales

* **Diseño Bento Grid Integrado:** Organización visual asimétrica de alto impacto en las secciones de Capacidades y Galería.
* **Visor Inmersivo Interactivo:** Panel dinámico en la galería que se activa mediante JavaScript para mostrar detalles técnicos de los proyectos seleccionados.
* **Calculadora de Presupuestos Avanzada:** Formulario guiado por pasos con validación de datos en tiempo real, selectores personalizados, controles deslizantes de rango (*sliders*) y un recibo flotante sutil (*sticky receipt*) que calcula la inversión de forma asíncrona.
* **Mapeado y Enrutamiento Dinámico:** Sección de contacto equipada con un panel de control para trazar rutas y modos de transporte hacia la sede corporativa.
* **Arquitectura de CSS Limpia:** Estilos desacoplados y modulares basados en variables globales (`:root`) para facilitar el mantenimiento y la escalabilidad cromática.

---

## 📂 Estructura de Estilos (CSS)

El diseño visual de la plataforma está segmentado en módulos independientes para garantizar la optimización de carga y la organización del código:

| Archivo | Descripción / Responsabilidad |
| :--- | :--- |
| `variables.css` | Centralización de la paleta cromática, importación de la fuente tipográfica corporativa (`Afacad`) y configuraciones raíz. |
| `home.css` | Estilos de la página de inicio. Incluye la sección *Hero* con desenfoque (`blur`), bloques de historia (*Mechanical Heritage*) y la rejilla de capacidades. |
| `galeria.css` | Arquitectura de la galería asimétrica densa, efectos *hover* con gradientes y los estados del visor inmersivo de proyectos. |
| `presupuesto.css` | Maquetación del formulario por pasos, gestión de estados de error, componentes nativos estilizados e interfaz del recibo flotante. |
| `contacto.css` | Estructura de la página de contacto, maquetación de datos corporativos y la interfaz del sistema de enrutamiento junto al lienzo del mapa. |

---

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica avanzada.
* **CSS3:** Maquetación moderna utilizando **CSS Grid** (propiedades *dense* y *spans*), **Flexbox** y animaciones optimizadas por hardware (`@keyframes`).
* **JavaScript (Vanilla JS):** Lógica interactiva para el filtrado de la galería, inyección de datos en el visor, cálculo asíncrono del presupuesto y manejo de estados visuales.
* **Google Fonts:** Integración de la familia tipográfica `Afacad`.

---

## 💻 Instalación y Uso Local

Para previsualizar y trabajar en el proyecto en tu entorno local, no necesitas compiladores ni gestores de paquetes pesados. Sigue estos sencillos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/chrono-service.git](https://github.com/tu-usuario/chrono-service.git)
Navegar al directorio del proyecto:

Bash


cd chrono-service
Ejecutar el proyecto:

Puedes abrir directamente el archivo index.html en cualquier navegador web moderno.

Recomendado: Utiliza la extensión Live Server de Visual Studio Code para disfrutar de recarga en vivo mientras editas los archivos CSS o JS.

🎨 Personalización de Estilos
Si necesitas adaptar los colores de la plataforma a una nueva identidad corporativa, puedes modificar directamente el archivo variables.css. Los componentes y las tarjetas actualizarán sus contrastes de manera automática:

CSS


:root {
  --color-primary: #456084;   /* Color destacado de botones y enlaces */
  --color-secondary: #516176; /* Textos secundarios y estados hover */
  --color-tertiary: #DBE4E7;  /* Líneas divisorias y bordes tenues */
  --color-neutral: #F1F4F6;   /* Fondos de tarjetas y contenedores */
  --color-main: #F8F9FB;      /* Fondo principal limpio de la web */
}
📄 Licencia
Este proyecto se distribuye bajo la licencia MIT. Siéntete libre de utilizarlo, modificarlo y adaptarlo a tus necesidades.
