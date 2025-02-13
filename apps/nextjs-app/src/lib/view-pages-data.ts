import type { IFieldVo, IRecord, IViewVo } from '@teable/core';
import type { IGetBaseVo, ITableVo } from '@teable/openapi';
import type { SsrApi } from '@/backend/api/rest/table.ssr';

export interface IViewPageProps {
  baseServerData: IGetBaseVo;
  tableServerData: ITableVo[];
  fieldServerData: IFieldVo[];
  viewServerData: IViewVo[];
  recordsServerData: { records: IRecord[] };
  recordServerData?: IRecord;
}

export const getViewPageServerData = async (
  ssrApi: SsrApi,
  baseId: string,
  tableId: string,
  viewId: string
): Promise<IViewPageProps | undefined> => {
  const api = ssrApi;
  const tableResult = await api.getTable(baseId, tableId, viewId);
  if (tableResult) {
    const base = await api.getBaseById(baseId);
    const tablesResult = await api.getTables(baseId);
    const { fields, views, records } = tableResult;
    return {
      baseServerData: base,
      tableServerData: tablesResult,
      fieldServerData: fields,
      viewServerData: views,
      recordsServerData: { records },
    };
  }
  return undefined;
};
