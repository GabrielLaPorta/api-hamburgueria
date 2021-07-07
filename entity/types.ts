import { Column } from 'typeorm';
import { ColumnCommonOptions } from 'typeorm/decorator/options/ColumnCommonOptions';
import { ColumnNumericOptions } from 'typeorm/decorator/options/ColumnNumericOptions';

export type Role = 'ADMINISTRATOR' | 'STANDARD';
export type Language = 'pt-BR';
export function CurrencyColumn(options?: ColumnCommonOptions & ColumnNumericOptions): Function {
    return Column('numeric', { precision: 17, scale: 2, ...options });
}
