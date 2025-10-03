import { Injectable, Logger } from '@nestjs/common';
import { CategoryService } from '../core/services/category.service';
import { PostsService } from '../core/services/posts.service';
import { RelatedService } from '../core/services/related.service';
import { TaxonomyService } from '../core/services/taxonomy.service';
import { Category } from '../core/repositories/category/category.entity';
import { Post, PostStatus } from '../core/repositories/post/post.entity';
import { LikesService } from '../core/services/likes.service';

@Injectable()
export class DataService {
  private readonly logger = new Logger(DataService.name);

  constructor(
    private readonly categoryService: CategoryService,
    private readonly postService: PostsService,
    private readonly likeService: LikesService,
    private readonly relatedService: RelatedService,
    private readonly taxonomyService: TaxonomyService,
  ) {}

  async loadDataByDefault(): Promise<void> {
    // 1. Categorías
    const categories = [
      // Categorías principales educativas
      { title: 'Alumnos', slug: 'alumnos' },
      { title: 'Profesores', slug: 'profesores' },
      { title: 'Administración', slug: 'administracion' },

      // Subcategorías de Alumnos
      { title: 'Acceso y Registro', slug: 'acceso-registro' },
      { title: 'Tareas y Trabajos', slug: 'tareas-trabajos' },
      { title: 'Notas y Calificaciones', slug: 'notas-calificaciones' },
      { title: 'Horarios y Clases', slug: 'horarios-clases' },

      // Subcategorías de Profesores
      { title: 'Gestión de Cursos', slug: 'gestion-cursos' },
      { title: 'Evaluaciones', slug: 'evaluaciones' },
      { title: 'Comunicación', slug: 'comunicacion' },

      // Subcategorías de Administración
      { title: 'Cuentas y Usuarios', slug: 'cuentas-usuarios' },
      { title: 'Seguridad', slug: 'seguridad' },
      { title: 'Configuración', slug: 'configuracion' },
    ];

    const createdCategories: Category[] = [];
    for (const cat of categories) {
      const category = await this.categoryService.create(cat);
      this.logger.debug(`Created category: ${cat.title}`);
      createdCategories.push(category);
    }

    // 2. Taxonomía (jerarquía de categorías)
    const taxonomyData = [
      // Subcategorías de Alumnos
      { category: createdCategories[3].id, parent: createdCategories[0].id }, // Acceso -> Alumnos
      { category: createdCategories[4].id, parent: createdCategories[0].id }, // Tareas -> Alumnos
      { category: createdCategories[5].id, parent: createdCategories[0].id }, // Notas -> Alumnos
      { category: createdCategories[6].id, parent: createdCategories[0].id }, // Horarios -> Alumnos

      // Subcategorías de Profesores
      { category: createdCategories[7].id, parent: createdCategories[1].id }, // Gestión -> Profesores
      { category: createdCategories[8].id, parent: createdCategories[1].id }, // Evaluaciones -> Profesores
      { category: createdCategories[9].id, parent: createdCategories[1].id }, // Comunicación -> Profesores

      // Subcategorías de Administración
      { category: createdCategories[10].id, parent: createdCategories[2].id }, // Cuentas -> Administración
      { category: createdCategories[11].id, parent: createdCategories[2].id }, // Seguridad -> Administración
      { category: createdCategories[12].id, parent: createdCategories[2].id }, // Configuración -> Administración
    ];

    for (const tax of taxonomyData) {
      await this.taxonomyService.create(tax);
      this.logger.debug(
        `Created taxonomy: category ${tax.category} -> parent ${tax.parent}`,
      );
    }

    // 3. Posts
    const posts = [
      // Posts para Alumnos - Acceso y Registro
      {
        title: '¿Cómo crear mi cuenta de estudiante?',
        content:
          'Para crear tu cuenta de estudiante en Redif, sigue estos pasos:\n\n1. Ve a la página de registro\n2. Ingresa tu número de matrícula\n3. Completa tus datos personales\n4. Verifica tu correo electrónico\n5. Configura tu contraseña segura\n\nUna vez completado el proceso, podrás acceder a todas las funcionalidades del campus virtual.',
        status: PostStatus.PUBLISHED,
        slug: 'como-crear-cuenta-estudiante',
        category: [createdCategories[3].id], // Acceso y Registro
      },
      {
        title: '¿Cómo recuperar mi contraseña?',
        content:
          'Si olvidaste tu contraseña, puedes recuperarla fácilmente:\n\n1. Ve a la página de inicio de sesión\n2. Haz clic en "¿Olvidaste tu contraseña?"\n3. Ingresa tu correo electrónico o número de matrícula\n4. Revisa tu correo para el enlace de recuperación\n5. Crea una nueva contraseña segura\n\nRecuerda usar una contraseña que contenga al menos 8 caracteres, mayúsculas, minúsculas y números.',
        status: PostStatus.PUBLISHED,
        slug: 'como-recuperar-contrasena',
        category: [createdCategories[3].id], // Acceso y Registro
      },

      // Posts para Alumnos - Tareas y Trabajos
      {
        title: '¿Cómo entregar mis tareas?',
        content:
          'Para entregar tus tareas en la plataforma:\n\n1. Accede a tu curso desde el dashboard\n2. Ve a la sección "Tareas"\n3. Selecciona la tarea correspondiente\n4. Sube tu archivo (PDF, DOC, o formato requerido)\n5. Agrega comentarios si es necesario\n6. Haz clic en "Entregar"\n\nRecuerda revisar la fecha límite y los requisitos específicos de cada tarea.',
        status: PostStatus.PUBLISHED,
        slug: 'como-entregar-tareas',
        category: [createdCategories[4].id], // Tareas y Trabajos
      },
      {
        title: '¿Qué formatos de archivo puedo subir?',
        content:
          'Los formatos de archivo permitidos para las entregas son:\n\n**Documentos:**\n- PDF (.pdf)\n- Microsoft Word (.doc, .docx)\n- Texto plano (.txt)\n\n**Imágenes:**\n- JPEG (.jpg, .jpeg)\n- PNG (.png)\n\n**Otros:**\n- PowerPoint (.ppt, .pptx)\n- Excel (.xls, .xlsx)\n\n**Límites:**\n- Tamaño máximo: 25MB por archivo\n- Máximo 5 archivos por entrega',
        status: PostStatus.PUBLISHED,
        slug: 'formatos-archivo-permitidos',
        category: [createdCategories[4].id], // Tareas y Trabajos
      },

      // Posts para Alumnos - Notas y Calificaciones
      {
        title: '¿Dónde puedo ver mis calificaciones?',
        content:
          'Para consultar tus calificaciones:\n\n1. Inicia sesión en tu cuenta\n2. Ve al dashboard principal\n3. Selecciona "Mis Calificaciones" o accede desde cada curso\n4. Filtra por período académico si es necesario\n\nPodrás ver:\n- Calificaciones por materia\n- Promedio general\n- Historial académico\n- Comentarios del profesor\n\nLas calificaciones se actualizan automáticamente cuando el profesor las publica.',
        status: PostStatus.PUBLISHED,
        slug: 'donde-ver-calificaciones',
        category: [createdCategories[5].id], // Notas y Calificaciones
      },

      // Posts para Alumnos - Horarios y Clases
      {
        title: '¿Cómo acceder a mis clases virtuales?',
        content:
          'Para unirte a tus clases virtuales:\n\n1. Ve a tu horario de clases\n2. Busca la clase que está por comenzar\n3. Haz clic en "Unirse a la clase"\n4. Permite el acceso a cámara y micrófono si es necesario\n5. Espera a que el profesor inicie la sesión\n\n**Consejos:**\n- Únete 5 minutos antes del inicio\n- Verifica tu conexión a internet\n- Ten listos tus materiales de estudio\n- Mantén el micrófono silenciado hasta que sea necesario',
        status: PostStatus.PUBLISHED,
        slug: 'como-acceder-clases-virtuales',
        category: [createdCategories[6].id], // Horarios y Clases
      },

      // Posts para Profesores - Gestión de Cursos
      {
        title: '¿Cómo crear un nuevo curso?',
        content:
          'Para crear un curso en la plataforma:\n\n1. Accede al panel de profesor\n2. Haz clic en "Crear Nuevo Curso"\n3. Completa la información básica:\n   - Nombre del curso\n   - Código de materia\n   - Descripción\n   - Período académico\n4. Configura los ajustes del curso\n5. Agrega el contenido inicial\n6. Publica el curso\n\nUna vez creado, podrás inscribir estudiantes y comenzar a subir material.',
        status: PostStatus.PUBLISHED,
        slug: 'como-crear-nuevo-curso',
        category: [createdCategories[7].id], // Gestión de Cursos
      },

      // Posts para Profesores - Evaluaciones
      {
        title: '¿Cómo crear y calificar exámenes?',
        content:
          'Para crear exámenes en línea:\n\n**Crear examen:**\n1. Ve a tu curso y selecciona "Evaluaciones"\n2. Haz clic en "Crear Examen"\n3. Agrega preguntas (opción múltiple, verdadero/falso, ensayo)\n4. Configura tiempo límite y intentos permitidos\n5. Programa fecha y hora de disponibilidad\n\n**Calificar:**\n1. Ve a "Exámenes Pendientes"\n2. Revisa las respuestas de cada estudiante\n3. Asigna puntuación\n4. Agrega comentarios de retroalimentación\n5. Publica las calificaciones',
        status: PostStatus.PUBLISHED,
        slug: 'como-crear-calificar-examenes',
        category: [createdCategories[8].id], // Evaluaciones
      },

      // Posts para Profesores - Comunicación
      {
        title: '¿Cómo enviar mensajes a mis estudiantes?',
        content:
          'Para comunicarte con tus estudiantes:\n\n**Mensaje individual:**\n1. Ve al perfil del estudiante\n2. Haz clic en "Enviar Mensaje"\n3. Escribe tu mensaje\n4. Envía\n\n**Mensaje grupal:**\n1. Ve a tu curso\n2. Selecciona "Comunicación" > "Enviar Anuncio"\n3. Escribe el mensaje\n4. Selecciona destinatarios (todo el curso o grupos específicos)\n5. Programa envío si es necesario\n\n**Foro de discusión:**\n1. Crea temas de discusión\n2. Modera las participaciones\n3. Responde preguntas frecuentes',
        status: PostStatus.PUBLISHED,
        slug: 'como-enviar-mensajes-estudiantes',
        category: [createdCategories[9].id], // Comunicación
      },

      // Posts para Administración - Cuentas y Usuarios
      {
        title: '¿Cómo gestionar usuarios del sistema?',
        content:
          'Para administrar usuarios en Redif:\n\n**Crear usuarios:**\n1. Ve al panel de administración\n2. Selecciona "Gestión de Usuarios"\n3. Haz clic en "Agregar Usuario"\n4. Completa los datos requeridos\n5. Asigna rol (estudiante, profesor, admin)\n\n**Modificar usuarios:**\n1. Busca el usuario en la lista\n2. Haz clic en "Editar"\n3. Actualiza la información necesaria\n4. Guarda los cambios\n\n**Desactivar usuarios:**\n1. Selecciona el usuario\n2. Cambia estado a "Inactivo"\n3. Confirma la acción',
        status: PostStatus.PUBLISHED,
        slug: 'como-gestionar-usuarios-sistema',
        category: [createdCategories[10].id], // Cuentas y Usuarios
      },

      // Posts para Administración - Seguridad
      {
        title: '¿Cómo configurar políticas de seguridad?',
        content:
          'Para establecer políticas de seguridad:\n\n**Contraseñas:**\n1. Ve a "Configuración" > "Seguridad"\n2. Establece requisitos mínimos:\n   - Longitud mínima\n   - Caracteres especiales requeridos\n   - Caducidad de contraseñas\n\n**Acceso:**\n1. Configura intentos de login permitidos\n2. Establece tiempo de bloqueo\n3. Define IPs permitidas si es necesario\n\n**Auditoría:**\n1. Activa logs de actividad\n2. Configura alertas de seguridad\n3. Programa reportes automáticos',
        status: PostStatus.PUBLISHED,
        slug: 'como-configurar-politicas-seguridad',
        category: [createdCategories[11].id], // Seguridad
      },
    ];

    const createdPosts: Post[] = [];
    for (const post of posts) {
      const p = await this.postService.create(post);
      this.logger.debug(`Created post: ${post.title}`);
      createdPosts.push(p);
    }

    // 4. Related (posts relacionados) - Relaciones más lógicas
    const relatedData = [
      // Relacionar posts de acceso y registro
      { post: createdPosts[0].id, related: createdPosts[1].id }, // Crear cuenta <-> Recuperar contraseña
      { post: createdPosts[1].id, related: createdPosts[0].id }, // Recuperar contraseña <-> Crear cuenta

      // Relacionar posts de tareas
      { post: createdPosts[2].id, related: createdPosts[3].id }, // Entregar tareas <-> Formatos archivo
      { post: createdPosts[3].id, related: createdPosts[2].id }, // Formatos archivo <-> Entregar tareas

      // Relacionar posts de profesores
      { post: createdPosts[6].id, related: createdPosts[7].id }, // Crear curso <-> Crear exámenes
      { post: createdPosts[7].id, related: createdPosts[8].id }, // Crear exámenes <-> Enviar mensajes
      { post: createdPosts[8].id, related: createdPosts[6].id }, // Enviar mensajes <-> Crear curso

      // Relacionar posts de administración
      { post: createdPosts[9].id, related: createdPosts[10].id }, // Gestionar usuarios <-> Políticas seguridad
      { post: createdPosts[10].id, related: createdPosts[9].id }, // Políticas seguridad <-> Gestionar usuarios

      // Relaciones cruzadas útiles
      { post: createdPosts[0].id, related: createdPosts[9].id }, // Crear cuenta estudiante <-> Gestionar usuarios
      { post: createdPosts[4].id, related: createdPosts[7].id }, // Ver calificaciones <-> Crear exámenes
    ];

    for (const rel of relatedData) {
      await this.relatedService.create(rel);
      this.logger.debug(
        `Created related: post ${rel.post} <-> related ${rel.related}`,
      );
    }

    // 5. Likes (útil/no útil) - Distribución más realista
    const likesData = [
      // Posts populares con más likes positivos
      { post: createdPosts[0].id, value: true }, // Crear cuenta
      { post: createdPosts[0].id, value: true },
      { post: createdPosts[0].id, value: true },
      { post: createdPosts[0].id, value: false },

      { post: createdPosts[1].id, value: true }, // Recuperar contraseña
      { post: createdPosts[1].id, value: true },
      { post: createdPosts[1].id, value: true },

      { post: createdPosts[2].id, value: true }, // Entregar tareas
      { post: createdPosts[2].id, value: true },
      { post: createdPosts[2].id, value: false },

      { post: createdPosts[3].id, value: true }, // Formatos archivo
      { post: createdPosts[3].id, value: true },

      { post: createdPosts[4].id, value: true }, // Ver calificaciones
      { post: createdPosts[4].id, value: true },
      { post: createdPosts[4].id, value: true },
      { post: createdPosts[4].id, value: false },

      { post: createdPosts[5].id, value: true }, // Clases virtuales
      { post: createdPosts[5].id, value: true },
      { post: createdPosts[5].id, value: false },

      { post: createdPosts[6].id, value: true }, // Crear curso
      { post: createdPosts[6].id, value: true },

      { post: createdPosts[7].id, value: true }, // Crear exámenes
      { post: createdPosts[7].id, value: false },

      { post: createdPosts[8].id, value: true }, // Enviar mensajes
      { post: createdPosts[8].id, value: true },

      { post: createdPosts[9].id, value: true }, // Gestionar usuarios
      { post: createdPosts[9].id, value: false },

      { post: createdPosts[10].id, value: true }, // Políticas seguridad
      { post: createdPosts[10].id, value: true },
    ];

    for (const like of likesData) {
      await this.likeService.create(like);
      this.logger.debug(`Created like: post ${like.post} value ${like.value}`);
    }
  }
}
