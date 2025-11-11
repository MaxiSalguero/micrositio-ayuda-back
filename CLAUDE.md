# CLAUDE.md

Este archivo proporciona orientación a Claude Code (claude.ai/code) al trabajar con código en este repositorio.

## Descripción General del Proyecto

Esta es una aplicación backend NestJS para un micrositio de ayuda/documentación (similar a una base de conocimientos o sistema de preguntas frecuentes). La aplicación gestiona posts, categorías, taxonomías, likes y contenido relacionado con funcionalidad de búsqueda. Utiliza TypeORM con MySQL e incluye un sistema automático de carga de datos iniciales.

## Comandos de Desarrollo

### Ejecutar la Aplicación
```bash
npm run start:dev          # Modo desarrollo con recarga automática
npm run start              # Modo desarrollo estándar
npm run start:debug        # Modo debug con watch
npm run start:prod         # Modo producción (requiere build previo)
```

### Compilar
```bash
npm run build              # Compilar TypeScript a dist/
```

### Pruebas
```bash
npm run test               # Ejecutar pruebas unitarias
npm run test:watch         # Ejecutar pruebas en modo watch
npm run test:cov           # Ejecutar pruebas con reporte de cobertura
npm run test:e2e           # Ejecutar pruebas end-to-end
npm run test:debug         # Depurar pruebas
```

### Calidad de Código
```bash
npm run lint               # Ejecutar ESLint con auto-corrección
npm run format             # Formatear código con Prettier
```

## Arquitectura

### Arquitectura en Capas

El proyecto sigue un patrón de arquitectura en capas limpia:

```
src/
├── core/                           # Capa de lógica de negocio principal
│   ├── controllers/                # Manejadores de peticiones HTTP
│   ├── services/                   # Lógica de negocio
│   ├── repositories/               # Capa de acceso a datos
│   │   ├── {entidad}/
│   │   │   ├── {entidad}.entity.ts  # Entidad TypeORM
│   │   │   ├── {entidad}.repository.ts
│   │   │   └── dtos/               # Objetos de transferencia de datos
│   ├── guards/                     # Autenticación/autorización
│   └── interceptors/               # Transformación de request/response
├── modules/                        # Módulos de características
├── interfaces/                     # Interfaces TypeScript
├── config/                         # Archivos de configuración
└── scripts/                        # Scripts utilitarios (DataService)
```

### Patrón de Flujo de Datos

Request → Controller → Service → Repository → Base de Datos

- **Controllers**: Manejan peticiones HTTP, validación vía DTOs, devuelven respuestas
- **Services**: Contienen lógica de negocio, coordinan entre múltiples repositorios
- **Repositories**: Operaciones directas de base de datos usando TypeORM, envuelven entidades
- **DTOs**: Validan datos entrantes usando decoradores de class-validator

### Relaciones entre Entidades

- **Post**: Entidad principal de contenido con relación muchos-a-muchos con Categorías, uno-a-muchos con Likes
- **Category**: Puede tener múltiples posts, estructura jerárquica vía Taxonomy
- **Taxonomy**: Define relaciones padre-hijo entre categorías
- **Like**: Retroalimentación booleana (útil/no útil) para posts
- **Related**: Vincula posts como contenido relacionado

### Entidades Clave y sus Responsabilidades

**Post** (`src/core/repositories/post/`):
- Gestiona artículos de ayuda con título, contenido, slug, estado (DRAFT/PUBLISHED)
- Rastrea vistas (auto-incrementado al leer)
- Vinculado a múltiples categorías y tiene likes

**Category** (`src/core/repositories/category/`):
- Organiza posts jerárquicamente
- Usa la entidad Taxonomy para relaciones padre-hijo

**Search** (`src/core/repositories/search/`):
- Búsqueda de texto completo en título y contenido de posts
- Filtrado basado en categorías
- Posts populares por cantidad de vistas

**Taxonomy** (`src/core/repositories/taxonomy/`):
- Gestiona estructura jerárquica de categorías
- Relaciones padre-hijo para categorías

**Like** (`src/core/repositories/like/`):
- Sistema de retroalimentación booleana (útil/no útil)
- Rastrea el engagement de usuarios con posts

**Related** (`src/core/repositories/related/`):
- Vincula posts como contenido relacionado
- Relaciones bidireccionales entre posts

## Configuración de Base de Datos

### Variables de Entorno

Requeridas en el archivo `.env`:
```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=microsite_help
```

La configuración se carga vía `src/config/configuration.ts` y usa ConfigModule de NestJS.

### Inicialización de Base de Datos

**IMPORTANTE**: La aplicación usa `dropSchema: true` y `synchronize: true` en `src/app.module.ts:30-31`, lo que significa:
- La base de datos se elimina y recrea completamente en cada reinicio
- Los datos iniciales se cargan automáticamente vía `DataService.loadDataByDefault()` al iniciar
- Esta es una configuración de desarrollo y debe cambiarse para producción

## Estructura de Módulos

Cada funcionalidad está organizada como un módulo NestJS en `src/modules/`:

- **PostModule**: CRUD de posts, depende de CategoryModule
- **CategoryModule**: Gestión de categorías
- **SearchModule**: Funcionalidad de búsqueda
- **LikeModule**: Gestión de likes/dislikes
- **RelatedModule**: Gestión de posts relacionados
- **TaxonomyModule**: Jerarquía de categorías

Cada módulo típicamente exporta tanto su servicio como su repositorio para uso por otros módulos.

## Sistema de Interfaces

Las interfaces TypeScript en `src/interfaces/` definen contratos que las entidades y DTOs implementan. Esto asegura type safety a través de las capas de la aplicación. Cada entidad tiene una interfaz correspondiente que la entidad TypeORM implementa.

## Configuración Global

### Validación
Pipe de validación global configurado en `src/main.ts:11-16`:
- `whitelist: true` - Elimina propiedades que no están en el DTO
- `transform: true` - Auto-transforma payloads a instancias de DTO

### CORS
CORS está habilitado globalmente (`src/main.ts:9`)

### Puerto por Defecto
La aplicación se ejecuta en el puerto 3000 por defecto (configurable vía `process.env.PORT`)

## Implementación de Búsqueda

La funcionalidad de búsqueda (`SearchRepository`) utiliza:
- Búsqueda multi-palabra: divide la consulta y coincide todas las palabras en título O contenido
- Resultados ordenados por vistas (DESC) luego fecha de creación (DESC)
- Solo busca posts PUBLISHED
- Filtrado por categoría disponible
- Endpoint de posts populares basado en cantidad de vistas

## Notas de Desarrollo

- Las entidades TypeORM usan decoradores para validación y relaciones
- Los DTOs usan decoradores de class-validator (@IsString, @IsInt, @MaxLength, etc.)
- Los servicios pueden tener métodos placeholder (ej: PostsService tiene métodos update/delete vacíos)
- Los repositorios manejan todas las consultas directas a la base de datos
- Todas las entidades tienen timestamps (created/updated)
- Las vistas de posts se auto-incrementan cuando se obtienen por ID mediante `findById()`, pero no con `findByIdWithoutIncrement()`
