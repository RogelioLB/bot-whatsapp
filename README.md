# WhatsApp Bot con Node.js, TypeScript, BuilderBot y Shopify API

Este proyecto es un bot de WhatsApp desarrollado con **Node.js** y **TypeScript**, utilizando la librería **builderbot** y la **API de Shopify**. El bot permite a los usuarios obtener información sobre productos de una tienda de Shopify y también crear carritos de compra directamente desde WhatsApp. Además, está implementado en una máquina virtual de **DigitalOcean** utilizando **Docker** para su despliegue.

## Características

- 📦 **Consultar productos de Shopify**: Los usuarios pueden obtener información detallada sobre productos de una tienda de Shopify.
- 🛒 **Crear carritos de compra**: El bot permite crear carritos de compra directamente desde WhatsApp, facilitando el proceso de compra para los clientes.
- 🔧 **Desarrollado con Node.js y TypeScript**: El proyecto está escrito en TypeScript para aprovechar las ventajas de un tipado fuerte y mayor seguridad en tiempo de compilación.
- 🛠 **BuilderBot**: Se utilizó la librería **builderbot** para gestionar la integración con WhatsApp.
- 🌐 **Desplegado en DigitalOcean**: El bot se despliega en un entorno de producción utilizando **Docker** en una máquina virtual de **DigitalOcean**.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.
- **TypeScript**: Superset de JavaScript que añade tipado estático opcional.
- **builderbot**: Librería para la integración y automatización de WhatsApp.
- **Shopify API**: API utilizada para obtener información de productos y gestionar carritos de compra.
- **Docker**: Plataforma para la creación y gestión de contenedores que facilita el despliegue de aplicaciones.
- **DigitalOcean**: Proveedor de servicios en la nube, utilizado para alojar el bot.

## Instalación

Sigue los pasos a continuación para clonar e instalar el proyecto localmente:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/RogelioLB/bot-whatsapp.git
   cd bot-whatsapp
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```bash
    OPENAI_API_KEY
    SERVER
    DATABASE 
    USER 
    PASSWORD 
    API_URL
    SKYDROPX_API_KEY
    STORE_DOMAIN
    ACCESS_TOKEN
    PUBLIC_ACCESS_TOKEN
   ```

4. Inicia el bot en modo de desarrollo:

   ```bash
   npm run dev
   ```

5. (Opcional) Para ejecutar en producción utilizando Docker:

   ```bash
   docker build -t bot-whatsapp .
   docker run -d -p 3000:3000 bot-whatsapp
   ```

## Uso

El bot responde a comandos enviados por los usuarios en WhatsApp. 

## Despliegue en DigitalOcean

El bot se despliega en una máquina virtual de **DigitalOcean**, utilizando **Docker** para su contenedorización. Esto asegura un entorno controlado y facilita la escalabilidad y la replicabilidad del proyecto en otros entornos.

## Contribuciones

Si deseas contribuir a este proyecto, por favor, abre un **issue** o envía un **pull request**. ¡Toda ayuda es bienvenida!

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

¡Gracias por revisar este proyecto! Si tienes alguna pregunta o sugerencia, no dudes en contactarme o abrir un issue en GitHub.

