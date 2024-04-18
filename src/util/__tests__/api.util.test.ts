import { api, compareBaseRequest } from "../api.util";

describe("api.util", () => {
  it("should create an instance of axios with the correct base URL and headers", () => {
    expect(api.defaults.baseURL).toEqual(
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
    );
    expect(api.defaults.headers["Content-Type"]).toEqual("application/json");
  });

  it("should compare base request data correctly", () => {
    const config = {
      url: "/delayed-response-1",
      method: "get",
      data: undefined,
      params: { delay: 5 },
    };
    const requestData = [
      {
        url: "/delayed-response-1",
        method: "get",
        data: undefined,
        params: { delay: 5 },
      },
      {
        url: "/delayed-response-2",
        method: "get",
        data: undefined,
        params: { delay: 6 },
      },
    ];

    const result1 = compareBaseRequest(requestData[0], config);
    const result2 = compareBaseRequest(requestData[1], config);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });

  it("should compare complete request data correctly", () => {
    // TODO: Write test case for compareCompleteRequest function
  });

  it("should check if request payload is different correctly", () => {
    // TODO: Write test case for isRequestPayloadDifferent function
  });
});
