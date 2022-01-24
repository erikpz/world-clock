import { GenericService } from "./GenericService";

export class TimeService {
  private static instance: TimeService;
  private constructor() {}

  public static getInstance(): TimeService {
    if (!TimeService.instance) {
      TimeService.instance = new TimeService();
    }
    return TimeService.instance;
  }

  async getTimeZones(): Promise<APIResponse> {
    return GenericService.get({
      endpoint: "http://worldtimeapi.org/api/timezone",
    });
  }
  async getTimeAreas(area: string): Promise<APIResponse> {
    return GenericService.get({
      endpoint: `http://worldtimeapi.org/api/timezone/${area}`,
    });
  }
  async getTimeLocations(area: string, location: string): Promise<APIResponse> {
    return GenericService.get({
      endpoint: `http://worldtimeapi.org/api/timezone/${area}/${location}`,
    });
  }
}
