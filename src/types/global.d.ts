interface GenericServiceParams {
  endpoint: string;
  body?: object;
}

interface APIResponse {
  data: any;
  ok: boolean;
  status: number;
}
