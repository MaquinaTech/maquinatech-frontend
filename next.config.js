const nextConfig = {
  // Configuración de opciones de Babel
  babel: {
    presets: ['next/babel'], // Presets de Babel a utilizar
    plugins: [
      // Agrega aquí tus plugins de Babel personalizados si es necesario
    ],
  },
  // Configuración de opciones de Webpack
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Agrega aquí tus configuraciones personalizadas de Webpack
    return config;
  }
};

module.exports = nextConfig;
