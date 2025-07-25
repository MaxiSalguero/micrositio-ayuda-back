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
      {
        title: 'General',
        slug: 'general',
      },
      {
        title: 'Cuentas',
        slug: 'cuentas',
      },
      {
        title: 'Seguridad',
        slug: 'seguridad',
      },
      {
        title: 'Contraseñas',
        slug: 'contrasenas',
      },
      {
        title: 'Eliminación',
        slug: 'eliminacion',
      },
    ];
    const createdCategories: Category[] = [];
    for (const cat of categories) {
      const category = await this.categoryService.create(cat);
      this.logger.debug(`Created category: ${cat.title}`);
      createdCategories.push(category);
    }

    // 2. Taxonomía (jerarquía de categorías)
    const taxonomyData = [
      { category: createdCategories[1].id, parent: createdCategories[0].id }, // Cuentas -> General
      { category: createdCategories[2].id, parent: createdCategories[0].id }, // Seguridad -> General
      { category: createdCategories[3].id, parent: createdCategories[2].id }, // Contraseñas -> Seguridad
      { category: createdCategories[4].id, parent: createdCategories[1].id }, // Eliminación -> Cuentas
    ];
    for (const tax of taxonomyData) {
      await this.taxonomyService.create(tax);
      this.logger.debug(
        `Created taxonomy: category ${tax.category} -> parent ${tax.parent}`,
      );
    }

    // 3. Posts
    const posts = [
      {
        title: '¿Cómo crear una cuenta?',
        content: 'Paso a paso para crear una cuenta...',
        status: PostStatus.PUBLISHED,
        slug: 'como-crear-una-cuenta',
        category: [createdCategories[1].id], // Cuentas
      },
      {
        title: '¿Cómo restablecer la contraseña?',
        content: 'Guía para restablecer tu contraseña...',
        status: PostStatus.PUBLISHED,
        slug: 'como-restablecer-la-contrasena',
        category: [createdCategories[3].id], // Contraseñas
      },
      {
        title: '¿Cómo cambiar el correo?',
        content: 'Instrucciones para cambiar tu correo...',
        status: PostStatus.PUBLISHED,
        slug: 'como-cambiar-el-correo',
        category: [createdCategories[1].id], // Cuentas
      },
      {
        title: '¿Cómo eliminar la cuenta?',
        content: 'Pasos para eliminar tu cuenta...',
        status: PostStatus.PUBLISHED,
        slug: 'como-eliminar-la-cuenta',
        category: [createdCategories[4].id], // Eliminación
      },
    ];
    const createdPosts: Post[] = [];
    for (const post of posts) {
      const p = await this.postService.create(post);
      this.logger.debug(`Created post: ${post.title}`);
      createdPosts.push(p);
    }

    // 4. Related (posts relacionados)
    const relatedData = [
      { post: createdPosts[0].id, related: createdPosts[1].id }, // Post 1 relacionado con Post 2
      { post: createdPosts[0].id, related: createdPosts[2].id }, // Post 1 relacionado con Post 3
      { post: createdPosts[1].id, related: createdPosts[0].id }, // Post 2 relacionado con Post 1
      { post: createdPosts[1].id, related: createdPosts[3].id }, // Post 2 relacionado con Post 4
    ];
    for (const rel of relatedData) {
      await this.relatedService.create(rel);
      this.logger.debug(
        `Created related: post ${rel.post} <-> related ${rel.related}`,
      );
    }

    // 5. Likes (útil/no útil)
    const likesData = [
      { post: createdPosts[0].id, value: true },
      { post: createdPosts[0].id, value: true },
      { post: createdPosts[0].id, value: false },
      { post: createdPosts[1].id, value: true },
      { post: createdPosts[2].id, value: false },
      { post: createdPosts[3].id, value: true },
    ];
    for (const like of likesData) {
      await this.likeService.create(like);
      this.logger.debug(`Created like: post ${like.post} value ${like.value}`);
    }
  }
}
