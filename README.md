# Cubusfera Web

Una aplicación web moderna construida con Next.js y diversas tecnologías potentes para una experiencia de usuario mejorada.

## 🚀 Características

- **Stack Moderno**: Construido con Next.js y React
- **UI Elegante**: Diseñado con Tailwind CSS y componentes de shadcn/ui
- **Diseño Responsivo**: Totalmente adaptable a todos los dispositivos
- **Soporte de Modo Oscuro**: Capacidad integrada de cambio de tema
- **Soporte Markdown**: Edición de texto enriquecido compatible con Markdown
- **Actualizaciones en Tiempo Real**: Utilizando patrones modernos de React
- **Integración con Minecraft**: Integración backend con Minecraft Fabric API

## 🛠️ Tecnologías Utilizadas

- **Frontend**:
  - Next.js
  - React
  - Tailwind CSS
  - shadcn/ui
  - Lucide Icons
  - React Hook Form
  - Sonner (Notificaciones)
  - React Markdown

- **Backend**:
  - Supabase para la base de datos
  - Discord.js para integración con Discord
  - Fabric API para integración con Minecraft

## 📦 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tuusuario/cubusfera-web.git
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env.local` en el directorio raíz y añadir las variables de entorno necesarias.

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## 🔧 Configuración

La aplicación requiere que se configuren varias variables de entorno:

```env
# Required environment variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application configuration
SITE_URL=https://your-domain.com

# Minecraft integration
MINECRAFT_SERVER_WHITELIST_ADRESS=play.your-server.com
MINECRAFT_SERVER_STATS_ADRESS=play.your-server.com
MINECRAFT_WHITELISTING_TOKEN=your_secure_token
```

## 🌐 Rutas de API

La aplicación incluye varios endpoints de API para manejar:
- Autenticación de usuarios
- Gestión de estado premium
- Actualizaciones de perfil
- Integración con Discord
- Estadísticas desde Minecraft

## 🎨 Componentes de UI

La aplicación incluye varios componentes personalizados:
- Insignia Premium para indicar el estado del usuario
- Editor de biografía con soporte Markdown
- Componentes de formulario personalizados
- Navegación responsiva

## 📱 Diseño Responsivo

La aplicación es totalmente responsiva y funciona en:
- Ordenadores de escritorio
- Tabletas
- Dispositivos móviles

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! No dudes en enviar un Pull Request.

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia ISC - ver el archivo LICENSE para más detalles.

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Discord.js](https://discord.js.org/)
- [Fabric API](https://fabricmc.net/)