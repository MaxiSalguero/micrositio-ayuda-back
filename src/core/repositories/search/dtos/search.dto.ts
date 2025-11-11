import {
  Matches,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchDto {
  @Transform(({ value }) => {
    if (value == null) return undefined;
    const str = typeof value === 'string' ? value : String(value);
    return str.trim();
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  /*   @Matches(/^[\p{L}\p{N}\s\-_.,'":&@#()]+$/u, {
    message: 'El término de búsqueda contiene caracteres no permitidos',
  }) */
  q: string;

  @IsOptional()
  @Matches(/^\d+$/, { message: 'count debe ser un entero positivo' })
  count: number;
}
