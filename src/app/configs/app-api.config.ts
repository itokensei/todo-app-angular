import { environment } from '../../environments/environment';
import { ApiEndpoints } from './api-endpoints';
import { ApiConfig } from './api-config.interface';

// 環境ファイルと定数ファイルから設定値オブジェクトを構築
export const appApiConfig: ApiConfig = {
  baseUrl: environment.apiUrl,
  endpoints: {
    tasks: ApiEndpoints.TASKS,
    categories: ApiEndpoints.CATEGORIES,
  },
};
