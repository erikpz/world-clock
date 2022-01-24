export class GenericService {
  static async get({ endpoint }: GenericServiceParams): Promise<APIResponse> {
    const response = await fetch(endpoint, {
      method: "GET"
    });
    let dataResponse;
    try {
      dataResponse = await response.json();
    } catch (error) {
      console.log(response);
      dataResponse = {};
    }
    return {
      data: dataResponse,
      ok: response.ok,
      status: response.status,
    };
  }
}
