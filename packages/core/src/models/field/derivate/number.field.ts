import { z } from 'zod';
import type { FieldType, CellValueType } from '../constant';
import { FieldCore } from '../field';
import { numberFormattingDef } from '../formatting';

const numberOptionsDef = z.object({
  formatting: numberFormattingDef,
});

export type INumberFieldOptions = z.infer<typeof numberOptionsDef>;

export class NumberFieldCore extends FieldCore {
  type!: FieldType.Number;

  options!: INumberFieldOptions;

  defaultValue: number | null = null;

  cellValueType!: CellValueType.Number;

  static defaultOptions(): INumberFieldOptions {
    return {
      formatting: {
        precision: 0,
      },
    };
  }

  cellValue2String(cellValue: number) {
    if (cellValue == null) {
      return '';
    }
    const precision = this.options.formatting.precision;
    return cellValue.toFixed(precision);
  }

  convertStringToCellValue(value: string): number | null {
    const num = Number(value);
    if (Number.isNaN(num)) {
      return null;
    }
    return num;
  }

  repair(value: unknown) {
    if (typeof value === 'number') {
      return value;
    }
    if (typeof value === 'string') {
      return this.convertStringToCellValue(value);
    }
    throw new Error(`invalid value: ${value} for field: ${this.name}`);
  }

  validateOptions() {
    return numberOptionsDef.safeParse(this.options);
  }

  validateDefaultValue() {
    return z.number().optional().nullable().safeParse(this.defaultValue);
  }
}
